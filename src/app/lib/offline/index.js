// OO

export async function PickCreateOffDoc({title, content, shared}) {
    if (!title) {
        throw new Error('Title are required');
    }
    try {
        const create = await fetch('/api/offline/create',{
            method: "POST",
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify({title, content, shared})
        })
        const response = await create.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Create Docs');
    }
}

export async function PickOneOffDoc(offdocid) {
    try {
        const getdoc = await fetch(`/api/offline/get/${offdocid}`,{method: "GET"})
        const response = await getdoc.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Docs');
    }
}

export async function PickToChangeOffDoc(offdocid, { title, content, shared }) {
    try {
        const updated = await fetch(`/api/offline/c/${offdocid}`,{
            method: "PATCH",
            body: JSON.stringify({ title, content, shared })
        })
        const response = await updated.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update Docs');
    }
}

export async function PickToDeleteOffDoc(offdocid) {
    try {
        const deleted = await fetch(`/api/offline/d/${offdocid}`,{method: "DELETE"})
        const response = await deleted.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Delete Docs');
    }
}

export async function PickAllOffDocs() {
    try {
            const getalls = await fetch(`/api/offline/allofflines`,{
                method: "GET",
            })
            const response = await getalls.json()
            console.log(response);
            return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to find Docs');
    }
}