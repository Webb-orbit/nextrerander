export async function PickSignup(email, username, password, logoupload) {
    if (!email || !username || !password || !logoupload) {
        throw new Error('all fildes are required');
    }
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avater', logoupload);

        const create = await fetch(`/api/client/signup`, {
            method: "POST",
            body: formData,
            credentials: 'include'
        });
        const response = await create.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Signup');
    }
}


export async function PickLogin(email, password) {
    if (!email || !password) {
        throw new Error('all fildes are required');
    }
    try {
        const login = await fetch('/api/client/login',{
            method: "POST",
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify({email, password}),
            credentials: "include"
        })
        const response = await login.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Login');
    }
}

export async function PickGetUser() {
    try {
        const user = await fetch("/api/client/getuser", {method: 'GET'})
        const response = await user.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Get User');
    }
}

export async function PickLogOut() {
    try {
        const user = await fetch("/api/client/logout", {method: 'GET'})
        const response = await user.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Logout User');
    }
}

// CHANGE
export async function PickCAvater(newphoto) {
    if (!newphoto) {
        throw new Error("Avater is required")
    }
    try {
        const formdata = new FormData()
        formdata.append("avater", newphoto)

        const updateavater = await fetch("/api/client/change/avatar", {
            method: 'PATCH',
            body: formdata,
        })
        const response = await updateavater.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Update Avater');
    }
}


export async function PickCDetiles(email, username) {
    if (!email && !username) {
        throw new Error("one feald is required")
    }
    try {
        const update = await fetch("/api/client/change/detiles",{
            method: "PATCH",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({email, username}),
        })
        const response = await update.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Update Detiles');
    }
}


export async function PickCPassword({oldpassword, newpassword}) {
    if (!oldpassword || !newpassword) {
        throw new Error("two fealds is required")
    }
    try {
        const update = await fetch("/api/client/change/password",{
            method: "PATCH",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({oldpassword, newpassword}),
        })

        const response = await update.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Change Password');
    }
}


// APIKEY

export async function PickAUKey(apikey) {
    if (!apikey) {
        throw new Error("two fealds is required")
    }
    try {
        const updatekey = await fetch("/api/client/apikey/addorupdatekey",{
            method: "PATCH",
            body: JSON.stringify({apikey}),
            headers:{"Content-Type": "application/json"},
        })

        const response = await updatekey.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Add/Update Apikey');
    }
}

export async function PickDeleteKey() {
    try {
        const deletekey = await fetch("/api/client/apikey/deletekey",{
            method: "DELETE",
        })

        const response = await deletekey.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Delete Apikey');
    }
}


export async function PickGetKey() {
    try {
        const getkey = await fetch("/api/client/apikey/getkey",{
            method: "GET",
        })

        const response = await getkey.json()
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Get Apikey');
    }
}

