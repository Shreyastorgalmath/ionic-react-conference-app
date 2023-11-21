import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Swiper as SwiperCore } from 'swiper';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet'; 
interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface ZohoProps extends OwnProps, DispatchProps { };

const Zoho: React.FC<ZohoProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  let [swiper, setSwiper] = useState<SwiperCore>();

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  
  const startApp = async () => { 
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  const handleSlideChangeStart = () => { 
    if(!swiper) return;
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage id="tutorial-page">
  <Helmet>
          <script type="text/javascript">
            {`
           !async function(){try{let e="8438f7bf-4166-4329-b4f6-c44c598f7dcb",w="api.sms-magic.com",a="https://app.sms-magic.com",o="",n="",c="",i=3e3,d="https://tenali.sms-magic.com";async function t(){o=a+"/v1/conversive/button/run/"+e+"?latitude="+n+"&longitude="+c;let t=await fetch(o).then((t=>t.json())).then((t=>t)).catch((t=>{}));if("success"===t.response.status){let e=t.response;if(document.getElementById(e.data.button_config.scriptLocation))displayButton(e.data);else{const t=document.getElementsByTagName("head")[0],a=document.createElement("link"),o=document.createElement("script"),n=document.createElement("link"),c=document.createElement("script");a.rel="stylesheet",a.type="text/css",a.href=e.data.button_config.cssLocation,a.onload=()=>{t.appendChild(o)},t.appendChild(a),o.type="text/javascript",o.id=e.data.button_config.scriptLocation,o.src=e.data.button_config.scriptLocation,o.onload=()=>{displayButton(e.data)},n.rel="stylesheet",n.type="text/css",c.id=e.data.chatbot_config.chatbotCSS,n.href=e.data.chatbot_config.chatbotCSS,n.onload=()=>{t.appendChild(c)},t.appendChild(n),c.type="text/javascript",c.id=e.data.chatbot_config.chatbotJS,c.src=e.data.chatbot_config.chatbotJS,c.onload=()=>{loadChatBot(d,w,e.data)}}}}navigator.geolocation&&navigator.geolocation.getCurrentPosition((e=>{n=e.coords.latitude,c=e.coords.longitude,t()}),(e=>{t()}),{timeout:i}),setTimeout(t,i)}catch(s){}}();
            `}
          </script>
        </Helmet>  
      <IonContent fullscreen>
            <img id="image1" src="assets/img/image.png" style={{ width: '100%' }} />
            <img id="image2" src="assets/img/image1.png" style={{ width: '100%' }} />
            <img id="image3" src="assets/img/image2.png" style={{ width: '100%' }} />
            <img id="image4" src="assets/img/image3.png" style={{ width: '100%' }} />
           
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Zoho
});