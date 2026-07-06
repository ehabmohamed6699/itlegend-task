import { ThemeProvider } from './context/ThemeContext'
import CourseDetails from './CourseDetails'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <CourseDetails />
    </ThemeProvider>
  )
}

export default App
