import React from 'react'
import githubLogo from './assets/github-mark.png'

function Github() {
  const githubUrl = 'https://github.com/Archaick/instructor-review'
    return (
        <div className='github-container'>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <img className='github-logo' src={githubLogo} alt="GitHub Logo" style={{ width: 35, height: 'auto', cursor: 'pointer' }} />
            </a>
        </div>
    )
} 

export default Github
