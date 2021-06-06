import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { TiArrowBackOutline } from 'react-icons/ti';
import styled from 'styled-components';
import { Canvas } from '../../components/Canvas';
import { colors } from '../../style/colors';
import { DummyButton } from '../../style/components/DummyButton';
import { layoutConstants } from '../../style/layoutConstants';

type Props = {};

type CanvasSize = {
  width: number;
  height: number;
};

export const NotFound: React.FC<Props> = ({}) => {
  const [brushColor, setBrushColor] = useState(colors.lightBlue);
  const [brushSize, setBrushSize] = useState(5);
  const [havingFun, setHavingFun] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [canvas, setCanvas] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  const setCanvasSize = (wrapper: HTMLDivElement) => {
    const w =
      wrapper.offsetWidth -
      parseInt(layoutConstants.navbarWidth) -
      parseInt(layoutConstants.subNavWidth);
    const h = wrapper.offsetHeight;

    setCanvas({
      width: w,
      height: h,
    });
  };

  useEffect(() => {
    if (wrapperRef.current) {
      setCanvasSize(wrapperRef.current);
    }
  }, []);

  function togglePlay() {
    const audio = document.getElementById('nyanSong');
    if (!audio) return;
    audio.onplay = () => {
      setHavingFun(true);
    };
    audio.onpause = () => {
      setHavingFun(false);
    };
    // @ts-ignore
    audio.paused ? audio.play() : audio.pause();
  }

  const displayRecentImages = () => {
    const localStoragePics = JSON.parse(localStorage.getItem('pictures') || '[]');
    return localStoragePics.map((pic: string, index: number) => (
      <>
        {pic.length > 0 && (
          <S.ImageContainer key={index}>
            <img src={pic} width="50px" height="50px" alt={"canvas picture"} />
            <a href={pic} download>
              Download
            </a>
          </S.ImageContainer>
        )}
      </>
    ));
  };

  return (
    <>
      <audio
        id="nyanSong"
        src="https://vincens2005.github.io/vr/Nyan%20Cat%20[original].mp3"
        preload="auto"
      />
      <S.Wrapper ref={wrapperRef}>
        <S.Navbar>
          {navigator.onLine ? (
            <>
              <h1>404 *_*</h1>
              <S.GoBackButton onClick={() => history.back()}>
                <TiArrowBackOutline />
              </S.GoBackButton>
            </>
          ) : (
            <>
              <h1>Offline *_*</h1>
              <S.GoBackButton onClick={() => location.reload()}>
                <AiOutlineReload />
              </S.GoBackButton>
            </>
          )}
        </S.Navbar>
        <S.SubNav>
          <h2>Colors</h2>
          <ul>
            <li>
              <SettingField>
                <h3>Brush Color</h3>
                <input
                  type={'color'}
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                />
              </SettingField>
            </li>
            <li>
              <SettingField>
                <h3>Brush size: {brushSize}</h3>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  step="1"
                  onChange={(e) => setBrushSize(parseInt(e.currentTarget.value))}
                />
              </SettingField>
            </li>
            <li>
              <SettingField>
                <h3>Eraser</h3>
                <input
                  type="checkbox"
                  value={eraser.toString()}
                  onChange={(e) => {
                    setEraser((prev) => !prev);
                    console.log(e.currentTarget.value);
                  }}
                />
              </SettingField>
            </li>
            <li>
              <SettingField>
                <h3>Save canvas</h3>
                <DummyButton onClick={() => setSaveClicked((prev) => !prev)}>
                  Save
                </DummyButton>
              </SettingField>
            </li>
            <li>
              <SettingField>
                <h3>Have fun</h3>
                <PlayAudioButton
                  fun={havingFun}
                  onClick={() => {
                    togglePlay();
                  }}
                >
                  {havingFun ? 'Be serious' : 'Enjoy'}
                </PlayAudioButton>
              </SettingField>
            </li>
            <li>
              <SettingField>
                <h3>Recent masterpieces</h3>
                {displayRecentImages()}
              </SettingField>
            </li>
          </ul>
        </S.SubNav>
        <Canvas
          brushColor={brushColor}
          width={canvas.width}
          height={canvas.height}
          brushSize={brushSize}
          eraser={eraser}
          fun={havingFun}
          isSaveClicked={saveClicked}
        />
      </S.Wrapper>
    </>
  );
};

const PlayAudioButton = styled(DummyButton)<{ fun: boolean }>`
  padding: 0.5rem;
  font-weight: bold;
  ${(props) =>
    props.fun
      ? `
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #FFD200);
    background-size: 400% 400%;
    animation: gradient 3s ease infinite;
  `
      : ``}

  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

const SettingField = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;

  &:first-of-type {
    margin-top: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
`;

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `,
  GoBackButton: styled(DummyButton)`
    padding: 0.8rem;
    background-color: transparent;
    color: ${colors.link.notActive};
    width: max-content;
    &:hover {
      color: ${colors.link.active};
    }
    svg {
      font-size: 2rem;
      margin-right: 0.8rem;
    }
  `,
  Navbar: styled.nav`
    padding-top: ${layoutConstants.paddingTop};
    display: flex;
    flex-direction: column;
    min-width: ${layoutConstants.navbarWidth};
    user-select: none;
    background-color: ${colors.lightBlue};
    align-items: center;
    color: ${colors.layoutGrey};
  `,
  SubNav: styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    flex-wrap: wrap;
    min-width: ${layoutConstants.subNavWidth};
    padding: 2rem ${layoutConstants.sidePadding};
    border-right: 2px solid ${colors.layoutGrey};
    box-shadow: 10px 0 10px 0 ${colors.layoutGrey};
    h2 {
      font-weight: 700;
    }
    z-index: 1;
  `,
  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    img {
      width: 50px;
      height: 50px;
    }
    border: 2px solid ${colors.layoutGrey};
    box-shadow: 10px 0 10px 0 ${colors.layoutGrey};
  `,
};
