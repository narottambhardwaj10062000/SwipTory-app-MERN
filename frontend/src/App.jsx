import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage/HomePage';
import StorySlides from './components/StorySlides/StorySlides';
import ShareStory from './components/ShareStory/ShareStory';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import YourStoryMobile from './components/YourStoryMobile/YourStoryMobile';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/shared/:storyId" element={<ShareStory />} />
        <Route path='/bookmarks' element={<Bookmarks />}/>
        <Route path='/yourStories' element={<YourStoryMobile />} />
      </Routes>
    </BrowserRouter>
    // <StorySlides />
  )
}

export default App
