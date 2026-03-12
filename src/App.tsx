
import './App.css'
import Grid_Escenas from './components/Grid/Grid_Escenas';
import Portada from './components/Portada/Portada'
import Progress_Bar from './components/Progress_Bar/Progress_Bar';
import clip1Img from './assets/videosseed/clip1img.png';
import clip2Img from './assets/videosseed/clip2img.png';
import clip1Video from './assets/videosseed/1.Cafe_CAM.mp4';
import clip2Video from './assets/videosseed/Mate final.mp4';
import Frase_welcome from './components/Frase_welcome/Frase_welcome';


function App() {
  
   const videos = [
    {
      title: "Clip 1",
      img: clip1Img,
      video: clip1Video,
      storyboard: clip1Img
    },
    {
      title: "Clip 2",
      img: clip2Img,
      video: clip2Video,
      storyboard: clip2Img
    }
  ];

  return (
    <>
      <Portada />

      
      <Progress_Bar scenesDone={videos.length} totalScenes={105} />
      <Frase_welcome />
    
      <Grid_Escenas videos={videos} />

      
    </>
  )
}

export default App
