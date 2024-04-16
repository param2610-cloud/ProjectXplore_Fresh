import { NextRequest } from 'next/server'


export async function GET(request: NextRequest){
    const SearchParams = request.nextUrl.searchParams
    const country = SearchParams.get('country');
    const category = SearchParams.get('category');
    let res: any = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=1b0c7c052e39456e91424a89e6bf88ed`,{
        method:"GET"
    });
    res = await res.json()
    return new Response(JSON.stringify(res))
}