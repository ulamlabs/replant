import { BackButton, Header } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';
import androidStep1 from './assets/android-chrome-step-1.webp';
import androidStep2 from './assets/android-chrome-step-2.webp';
import androidStep3 from './assets/android-chrome-step-3.webp';
import iosStep1 from './assets/ios-safari-step-1.webp';
import iosStep2 from './assets/ios-safari-step-2.webp';
import iosStep3 from './assets/ios-safari-step-3.webp';

export const InstallationSteps: React.FC = () => {
  const fmtMsg = useFmtMsg();

  // The app is mobile only, no need to detect Windows or Linux user agents.
  const ua = window.navigator.userAgent;
  const isAndroid = /Android/.test(ua);
  const isApple = /iPhone|Macintosh/.test(ua);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className='space-y-5'>
      <Header text={fmtMsg('installation')} onBack={goBack} />
      <p className='text-center'>
        {fmtMsg('followTheStepsBelowToInstallTheApp')}
      </p>
      {isApple && (
        <>
          <Step img={iosStep1} text={fmtMsg('clickTheShareButton')} />
          <Step
            img={iosStep2}
            text={fmtMsg('scrollDownToFindAddToHomeScreenOptionAndSelectIt')}
          />
          <Step img={iosStep3} text={fmtMsg('clickAddToConfirmInstallation')} />
        </>
      )}
      {isAndroid && (
        <>
          <Step img={androidStep1} text={fmtMsg('clickTheOptionsMenuButton')} />
          <Step img={androidStep2} text={fmtMsg('selectInstallAppOption')} />
          <Step
            img={androidStep3}
            text={fmtMsg('clickInstallToConfirmInstallation')}
          />
        </>
      )}
      <p className='text-center'>
        {fmtMsg('theAppIsNowInstalledAndAddedToTheHomeScreen')}
      </p>
      <BackButton onClick={goBack} />
    </div>
  );
};

const Step: React.FC<{ img: string; text: string }> = ({ img, text }) => (
  <div>
    <img
      className='rounded-xl max-w-64 mx-auto mb-1 border border-teal-900 dark:border-white'
      src={img}
    />
    <p className='text-center'>{text}</p>
  </div>
);
