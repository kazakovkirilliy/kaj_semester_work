import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { HiCheckCircle, HiPlusCircle, HiTag, HiX } from 'react-icons/hi';

import { DashboardContext } from './DashboardContext';
import { S as IS } from './MyTasks/index';
import { colors } from '../../style/colors';
import { API_URL } from '../../config/paths';
import { User } from '../../context/auth/state';
import { useFormatTime } from '../../utils/hooks/useFormatTime';
import { BaseInput } from '../../style/components/forms/BaseInput';
import { DummyButton } from '../../style/components/DummyButton';
import { UserLink } from '../../components/UserLink';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TimeSpent = styled.span`
  font-size: 1.8rem;
  color: ${colors.darkGrey};
  text-align: end;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const AddMemberButton = styled(DummyButton)`
  border-radius: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  font-weight: 500;
  background-color: ${colors.layoutGrey};
  font-size: 2rem;
`;

interface ProjectMember {
  person: User;
  role: string;
}

const useProjectMembers = (projectId?: number): ProjectMember[] => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!projectId) return;

    axios
      .get(`${API_URL}/projects/${projectId}/members`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [projectId]);

  return data || [];
};

const useSpentTime = (refresh: boolean, projectId?: number): number | null => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!projectId) return;

    axios
      .get(`${API_URL}/projects/${projectId}/time`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setData(data);
      });
  }, [projectId, refresh]);

  return data || null;
};

export const ProjectInfo: React.FC = () => {
  const { currentProject, shouldRefresh } = useContext(DashboardContext);

  const projectMembers = useProjectMembers(currentProject?.id);
  const time = useSpentTime(shouldRefresh, currentProject?.id);
  const formattedTime = useFormatTime(time ?? 0);

  if (!currentProject) return null;

  return (
    <>
      <InfoWrapper>
        <IS.Wrapper>
          <IS.Title>Members</IS.Title>
          <IconContainer>
            {projectMembers.map(
              (member) =>
                member &&
                member.person && (
                  <UserLink style={{ marginRight: '0.8rem' }} user={member.person} />
                ),
            )}
            <AddMemberButton className={'tooltip'} title={'Not implemented yet'}>
              +
            </AddMemberButton>
          </IconContainer>
        </IS.Wrapper>
        <IS.Wrapper>
          <IS.Title>Time spent</IS.Title>
          <TimeSpent>{formattedTime}</TimeSpent>
        </IS.Wrapper>
      </InfoWrapper>
      <InfoWrapper>
        <IS.Wrapper>
          <IS.Title>Tags</IS.Title>
          <Tags />
        </IS.Wrapper>
      </InfoWrapper>
    </>
  );
};

const XButton = styled(HiX)`
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -3px;
`;

// has to be extracted due to prettier + tsc fighting
type TWProps = {
  isNew?: boolean;
};

const TagWrapper = styled.div<TWProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: ${colors.layoutGrey};
  font-size: 1.3rem;
  border-radius: 0.5rem;
  margin: 3px;
  & > svg {
    margin: 0 0.2rem;
  }
  ${(props) => (props.isNew ? 'cursor: pointer;' : '')}
`;

const NewTagInput = styled(BaseInput)`
  width: 80px;
  margin-left: -1px;
  font-size: 100%;
  padding: 0;
`;

const createTag = async (projectId: number, tagName: string): Promise<void> => {
  return axios
    .post(
      `${API_URL}/projects/${projectId}/tags`,
      {
        title: tagName,
      },
      {
        withCredentials: true,
      },
    )
    .then((resp) => {
      if (resp instanceof Error) throw resp; // ????? round2
      return resp.status < 400 ? void 0 : resp.data.message;
    })
    .catch((e: AxiosError) => {
      return e?.response?.data?.message ?? 'An error has occurred.';
    });
};

const deleteTag = async (projectId: number, tagId: number): Promise<void> => {
  return axios
    .delete(`${API_URL}/projects/${projectId}/tags/${tagId}`, {
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

const Tags = () => {
  const { currentProject, tags, refresh } = useContext(DashboardContext);
  const [newName, setNewName] = useState<string | null>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outsideClickListener = useRef<() => void>();

  const onClickNew = (e: React.MouseEvent) => {
    setNewName('');
    e.stopPropagation();
    outsideClickListener.current = () => {
      setNewName(null);
      if (outsideClickListener.current)
        document.body.removeEventListener('click', outsideClickListener.current);
    };
    document.body.addEventListener('click', outsideClickListener.current);

    setTimeout(() => inputRef.current?.focus());
  };

  const saveNewTag = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (inputRef.current) inputRef.current.disabled = true;

    if (!currentProject?.id) return;
    if (!newName) return;

    createTag(currentProject.id, newName).then(() => {
      setNewName(null);
      refresh();
      if (inputRef.current) inputRef.current.disabled = false;
    });
  };

  const onNewKeydown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      saveNewTag();
    } else if (e.code === 'Escape') {
      setNewName(null);
    }
  };

  const deleteTagAndRefresh = (tagId: number) => {
    if (!currentProject?.id) return;
    deleteTag(currentProject.id, tagId).then(() => refresh());
  };

  return (
    <TagContainer>
      {tags.map((tag) => (
        <TagWrapper key={tag.id}>
          <HiTag />
          {tag.title}
          {currentProject?.amAdmin && (
            <XButton onClick={() => deleteTagAndRefresh(tag.id)} />
          )}
        </TagWrapper>
      ))}
      {currentProject?.amAdmin && (
        <TagWrapper onClick={onClickNew} ref={newRef} isNew={true}>
          <HiPlusCircle />
          {newName !== null ? (
            <>
              <NewTagInput
                type="text"
                value={newName}
                placeholder="New..."
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={onNewKeydown}
                onClick={(e) => e.stopPropagation()}
                ref={inputRef}
              />
              <HiCheckCircle onClick={saveNewTag} />
            </>
          ) : (
            'New...'
          )}
        </TagWrapper>
      )}
    </TagContainer>
  );
};
