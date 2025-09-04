import React from "react";
import {SignIn, useUser} from '@clerk/clerk-react'

const Login = ()=> {
    const {user} = useUser();
    return !user && (
        <div className="flex h-[800px] w-full">
            <div className="w-full hidden md:inline-block ml-30">
                <img className="h-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center">
                <SignIn />
            </div>
        </div>
    );
};

export default Login;