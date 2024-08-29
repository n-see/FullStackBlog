//This will hold our helper functions or method

//helper function to check our token

let userData = {};
if(localStorage.getItem("UserData")){
    userData = JSON.parse(localStorage.getItem("UserData"))
}

const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null){
        result = true;
    }
    return result;
}

//helper function or method to cerateAccount, async and await
//fetch(), json(), stringify

const createAccount = async (createdUser) => 
{
    const result = await fetch("http://localhost:5118/api/User/AddUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createdUser)
    })
    if(!result.ok){
        const message = `Yo yo you have an Error Check your Code! ${result.status}`
        throw new Error(message);
    }
    let data= await result.json();
    console.log(data,"create account method");
}

const login = async (loginUser) =>
{
    const result = await fetch("http://localhost:5118/api/User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    })
    if(!result.ok){
        const message = `Yo yo you have an Error Check your Code! ${result.status}`
        throw new Error(message);
    }
    let data= await result.json();
    if(data.token != null){
        localStorage.setItem("Token", data.token);
        // localStorage.setItem("UserData", JSON.stringify(data.user));
    }
    console.log(data,"login method");
    return data;
    

}

const GetLoggedInUser = async  (username) => {
    let result = await fetch(`http://localhost:5118/api/User/GetUserByUsername/${username}`)
    userData = await result.json();
    console.log(userData,"getloggedinsuser method")
    localStorage.setItem("UserData", JSON.stringify(userData));
    userData = JSON.parse(localStorage.getItem("UserData"))

}

const LoggedInData = () => {

    // if(!userData && localStorage.getItem("UserData")){
        userData = JSON.parse(localStorage.getItem("UserData"))
    // }
    return userData;
}

 //We need a function to help us add our blog items
 const AddBlogItems = async (blogItems) => 
    {
        const result = await fetch("http://localhost:5118/api/Blog/AddBlogItems",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogItems)
        })
        if(!result.ok)
        {
            const message = `Yo yo you have an Error Check your code!${result.status}`
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data,"addblogItems method");
            return data;
    }

    //Can we make a generic function to handle
    const sendData = async (controller,endpoint,passedInData) => 
    {
        const result = await fetch(`http://localhost:5118/api/${controller}/${endpoint}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passedInData)
        })
        if(!result.ok)
        {
            const message = `Yo yo you have an Error Check your code!${result.status}`
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data,"sendData");
            return data;
    }
    ///function to help us get our blogitems
    const getBlogItems = async () =>
    {
        let result = await fetch("http://localhost:5118/api/blog/GetBlogItems")
       
       let data = await result.json();
         console.log(data,"from our getblogitems method")
         return data;
    }

    //create a function to hit our GetItemsByUserId 
    const GetItemsByUserId = async (UserId) => 
    {
        let result = await fetch(`http://localhost:5118/api/blog/GetItemsByUserId/${UserId}`)
       
        let data = await result.json();
          console.log(data,"from our getitemsbyuserid method")
          return data;
    }



export {checkToken,createAccount,login,GetLoggedInUser,LoggedInData,sendData,AddBlogItems,getBlogItems,GetItemsByUserId}