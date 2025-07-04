import { trpc } from "@/trpc";
import { notFound } from "next/navigation";

const fetchData=async(id:number)=>{
    try
    {
        const data=await trpc.v1_demo.query_demo.query({id});
        console.log(`RPC Data: ${JSON.stringify(data)}`);
        return data;
    }
    catch(ex){
        console.log(`Error: ${ex}`);
    }
    
}

const Page=async()=>{

    const data=await fetchData(1);

    if(!data?.id)
        return notFound();

    return (
        <>
            <h1>Demo TRPC</h1>
            <div className="flex flex-col gap-4 w-full items-center justify-center">
                <p>Title: {data.title}</p>
                <p>description: {data.description}</p>
            </div>
        </>
    )
}

export default Page;