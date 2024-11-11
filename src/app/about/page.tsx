import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className ="flex flex-col items-center m-20">
            <h1 className ="font-bold text-2xl">About Me</h1>
            <div className ="bg-gray-200 ml-5 mr-5 mt-5">
                <p className ="text-center">Hello! My name is Jocelyn. I am a software developer with a passion for creating amazing applications. I have experience in various programming languages and frameworks, and I love learning new technologies. In my free time, I enjoy hiking, reading, and spending time with family and friends. Thank you for visiting my page!</p>
            </div>
        </div>
    );
};

export default AboutPage;