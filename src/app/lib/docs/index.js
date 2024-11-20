export async function PickCreateDocs(title, content, shared) {
    if (!title) {
        throw new Error('Title are required');
    }
    try {
        const create = await fetch('/api/docs/create',{
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

export async function PickOneDoc(docid) {
    try {
        const getdoc = await fetch(`/api/docs/get/${docid}`,{method: "GET"})
        const response = await getdoc.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Docs');
    }
}

export async function PickToChangeDoc(docid, { title, content, shared }) {
    try {
        const updated = await fetch(`/api/docs/c/${docid}`,{
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

export async function PickToDeleteDoc(docid) {
    try {
        const deleted = await fetch(`/api/docs/d/${docid}`,{method: "DELETE",cache: "force-cache"})
        const response = await deleted.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Delete Docs');
    }
}

export async function PickAllDocs(page=0, q) {
    try {
        if (!q) {
            const getalls = await fetch(`/api/docs/alldocs`,{
                method: "POST",
                body: JSON.stringify({page, q})
            })
            console.log(getalls);
            const response = await getalls.json()
            console.log(response);
            return response
        }else{
            const getalls = await fetch(`/api/docs/alldocs?q=${q}`,{method: "POST"})
            const response = await getalls.json()
            console.log(response);
            return response
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to find Docs');
    }
}