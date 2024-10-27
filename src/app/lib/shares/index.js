export async function PickCreateShare(docid, privated) {
    if (!privated) {
        throw new Error('first set your share status');
    }
    try {
        const create = await fetch(`/api/share/create/${docid}`, {
            method: "POST",
            body: JSON.stringify({ privated })
        })
        const response = await create.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Create share');
    }
}

export async function PickOneShare(shareid) {
    try {
        const getshare = await fetch(`/api/share/get/${shareid}`, { method: "GET" })
        const response = await getshare.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed To Get Share');
    }
}

export async function PickToChangeShare(shareid, { privated, views }) {
    try {
        const updated = await fetch(`/api/share/c/${shareid}`, {
            method: "PATCH",
            body: JSON.stringify({ privated, views })
        })
        const response = await updated.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update Share');
    }
}

export async function PickToDeleteShare(shareid) {
    try {
        const deleted = await fetch(`/api/share/d/${shareid}`, { method: "DELETE" })
        const response = await deleted.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Delete Share');
    }
}

export async function PickAllDocs() {
    try {
        const getalls = await fetch(`/api/share/alldocs`, { method: "GET" })
        const response = await getalls.json()
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error('Failed to find Shares');
    }
}