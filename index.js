document.getElementById("login_btn").addEventListener("click", function(event) {
    event.preventDefault();
    // Gets user inputted credentials from form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Checks if username feild is blank
    if(username === "")
    {
        document.getElementById("output").innerHTML = "Input Username";
    }

    //Check if password feild is blank
    else if(password === "")
    {
        document.getElementById("output").innerHTML = "Input Password";
    }

    //If checks are cleared request is sent to backend to validate credentials
    else{
        fetch('https://stock-tracker-l64w.onrender.com/user_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => 
        {
            encoded_id = data.encoded_id
            cookie_name = "stock_tracker_cookie_container"   
            //If Request is successful user is redirected to dashboard page
            if(data.message === "Invalid username or password") 
            {
                document.getElementById("output").innerHTML = "Incorrect Username/Password";
            }  
                // If credentials are not valid, message is displayed to user showing "Incorrect Username/Password"
            else if(data.message === "Login successful")
            {
                const now = new Date();
                const expirationTime = new Date(now.getTime() + 15 * 60 * 1000);
                
                // Create a cookie string
                document.cookie = `stock_tracker_cookie_container=${encoded_id}; expires=${expirationTime.toUTCString()}; path=/`;
                location.href = '/dash'  
            } 
        })
        }
});

document.getElementById("demo_button").addEventListener("click", function(event) {
    event.preventDefault();
    const username = 'Jane25'
    const password = '12345'

    fetch('https://stock-tracker-l64w.onrender.com/user_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => 
    {
        encoded_id = data.encoded_id
        cookie_name = "stock_tracker_cookie_container"   
        //If Request is successful user is redirected to dashboard page
        if(data.message === "Invalid username or password") 
        {
            document.getElementById("output").innerHTML = "Incorrect Username/Password";
        }  
            // If credentials are not valid, message is displayed to user showing "Incorrect Username/Password"
        else if(data.message === "Login successful")
        {
            const now = new Date();
            const expirationTime = new Date(now.getTime() + 15 * 60 * 1000);
            
            // Create a cookie string
            document.cookie = `stock_tracker_cookie_container=${encoded_id}; domain=.expense-tracker-demo.site; expires=${expirationTime.toUTCString()}; path=/`;
            window.location.href = "https://stock-tracker-dashboard.expense-tracker-demo.site"  
        } 
    })
});

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display elements from the server
    cookieCheck(); 

});

function cookieCheck()
{
    cookie_name = "stock_tracker_cookie_container"
    if(document.cookie.split(';').some((item) => item.trim().startsWith(`${cookie_name}=`)))
    {
        window.location.href = "https://stock-tracker-dashboard.expense-tracker-demo.site";
    }
}