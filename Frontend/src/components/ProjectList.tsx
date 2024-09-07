import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from '@/lib/Domain';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { useToast } from './ui/use-toast';
import Link from 'next/link';

const ProjectList = () => {
    const { toast } = useToast();
    const [user] = useAtom(userAtom);
    const [projectList, setProjectList] = useState<any[]>([]);
    

    const getdata = useCallback( async () => {
        try {
            const response = await axios.get(`${Domain}/api/v1/project/list`, {
                params: { userId: user }
            });
            console.log(response);
            setProjectList(response.data);
            
            

        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Error occurred while retrieving projects"
            });
        }
    },[user]);

    useEffect(() => {
        getdata();
    }, [user]);
    return (
        <>
            {projectList.length > 0 ? (
                projectList.map((project) =>{
                    // author name retrieve
                    // const author = await axios.get(`${Domain}/api/v1/project/list`, {
                    //     params: { userId: response.data.data }
                    // });
                    return (
                    <Link key={project.id} href={`/project/${project.id}`}>
                    <Card key={project.id} className='mx-6 cursor-pointer'>
                        <CardContent className='text-sm'>
                            {}{project.name}
                        </CardContent>
                    </Card>
                        </Link>
                )})
            ) : (
                <div>No projects found.</div>
            )}
        </>
    );
};

export default ProjectList;
