import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios, { AxiosError } from 'axios';

import { InputField } from '../../../components/Forms/Fields/fields/InputField';
import { ActionButton } from '../../../style/components/forms/ActionButton';
import LoadingPlaceholder from '../../LoadingPlaceholder';
import { API_URL } from '../../../config/paths';
import { Task } from '../../../actions/dashboard/task';
import { DashboardContext } from '../DashboardContext';
import { LoadingPlaceholderWrapper, SForm } from '../styles';

type TaskCreationBody = Omit<Task, 'id' | 'reporter' | 'assignees' | 'createdAt'>;

const defaultInitialValues: TaskCreationBody = {
  subject: '',
  description: '',
  estimatedHours: 0,
  dueDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10),
  priority: 'NORMAL',
};

enum CreateTaskFormField {
  Subject = 'subject',
  Description = 'description',
  EstimatedHours = 'estimatedHours',
  DueDate = 'dueDate',
  Priority = 'priority',
}

interface CPFProps {
  onDone: () => void;
  initialData?: Task | false;
  submitButtonText?: string;
}

const submitTask = (
  projectId: number,
  task: TaskCreationBody,
  taskId?: number,
): Promise<string | void> => {
  const submittedTask = { ...task };
  const date = new Date(submittedTask.dueDate);
  date.setHours(23, 59);
  submittedTask.dueDate = date.toISOString();

  const editing = typeof taskId !== 'undefined';

  let url = `${API_URL}/projects/${projectId}/tasks`;
  if (editing) {
    url += `/${taskId}`;
  }
  return axios({
    url,
    method: editing ? 'PUT' : 'POST',
    data: submittedTask,
    withCredentials: true,
  })
    .then((resp) => {
      if (resp instanceof Error) throw resp; // ????? round2
      return resp.status < 400 ? void 0 : resp.data.message;
    })
    .catch((e: AxiosError) => {
      return e?.response?.data?.message ?? 'An error has occurred.';
    });
};

export const EditTaskForm: React.FC<CPFProps> = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { currentProject, refresh } = useContext(DashboardContext);

  if (!currentProject?.id) return null;

  const onSubmit = (values: TaskCreationBody) => {
    setSubmitting(true);
    submitTask(
      currentProject.id,
      values,
      props.initialData ? props.initialData?.id : undefined,
    ).then((errMsg) => {
      if (errMsg) {
        setSubmitting(false);
        setErrorMessage(errMsg);
      } else {
        props[0].closeModal();
        if (refresh) refresh();
        setSubmitting(false);
        props.onDone();
      }
    });
  };

  return (
    <Formik
      initialValues={
        props.initialData
          ? {
              ...props.initialData,
              dueDate: props.initialData.dueDate.slice(0, 10),
            }
          : defaultInitialValues
      }
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm({});
      }}
    >
      {() =>
        submitting ? (
          <LoadingPlaceholderWrapper>
            <LoadingPlaceholder />
          </LoadingPlaceholderWrapper>
        ) : errorMessage ? (
          <>
            <p>{errorMessage}</p>
            <ActionButton type="button" onClick={() => setErrorMessage(undefined)}>
              Try again
            </ActionButton>
          </>
        ) : (
          <SForm>
            <InputField
              fieldType="string"
              label="Title"
              name={CreateTaskFormField.Subject}
              required
            />
            <InputField
              fieldType="string"
              label="Description"
              name={CreateTaskFormField.Description}
            />
            <InputField
              fieldType="string"
              label="Estimated hours"
              name={CreateTaskFormField.EstimatedHours}
              type="number"
            />
            <InputField
              fieldType="string"
              label="Due date"
              name={CreateTaskFormField.DueDate}
              type="date"
              required
            />
            <InputField
              required
              fieldType="select"
              label="Priority"
              name={CreateTaskFormField.Priority}
              //@ts-ignore FIXME(low prio): InputField prop type
            >
              <option value={'LOW'}>Low</option>
              <option value={'NORMAL'}>Normal</option>
              <option value={'HIGH'}>High</option>
              <option value={'URGENT'}>Urgent</option>
              <option value={'IMMEDIATE'}>Immediate</option>
            </InputField>
            <ActionButton type="submit">
              {props.submitButtonText ? props.submitButtonText : 'Submit'}
            </ActionButton>
          </SForm>
        )
      }
    </Formik>
  );
};
