import Page from '@/app/compos/Docucopos/Docpage'

export async function generateMetadata({ params }) {
    const { docid } = (await params)

    return {
        title: `Rerander/${docid}`,
        description: 'one chance one change',
        generator: 'Next.js',
        keywords: ['rerander', '2026', 'vellane'],
        authors: [{ name: 'makarov' }, { name: 'TN', url: 'https://www.instagram.com/igtanii' }],
        creator: 'makarov',
    }
}

const page = () => {
    return (
        <Page />
    )
}

export default page