import * as React from 'react';
import {useForm} from "react-hook-form";
import {Input,Button,Select,RTE} from '../index';
import {updateFileMetaData,uploadFeatureImage} from '../../services/BlogService';
import { IBlogDetail } from '../../interface/IBlogDetail';
import {authService} from "../../services/AuthService";
import { IUserSession } from '../../interface/IUserDetail';

interface IFormValues{
    title:string;
    slug:string;
    content:string;
    status:string;
    image:any;
}

function PostForm({post}:any){

    const {register,handleSubmit,control,getValues,reset} = useForm<IFormValues>({
        defaultValues:{
            title:post?.Title || "",
            slug:post?.BlogTitle || "",
            content:post?.BlogContent || "",
            status:post?.BlogStatus || ""
        }
    });

    const onFormSubmission = async (data:any) =>{
        const currentUSer : IUserSession | null  =  await authService.getCurrentUser();
        if(currentUSer)
        {
                const file = data.image[0];
                const fileName:string = file?.name;

                const fileNamePart = fileName.split('.');
                const newFileName = fileNamePart[0] + Date.now() + "."+ fileNamePart[1];

                const uploadedImage = await uploadFeatureImage(file,newFileName);
                if(uploadedImage.ID){                   

                    const inputData:IBlogDetail = {
                        Title : data.title,
                        BlogTitle : data.slug, 
                        BlogContent : data.content,
                        BlogStatus: data.status,
                        UserEmail : currentUSer.UserEmail
                    }
                    const metaDataUpdate = await updateFileMetaData(inputData,uploadedImage.ID);
                    reset();
                    console.log("Data Updated",metaDataUpdate);
                }
        }    
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onFormSubmission)}>
                <div>
                    <div>
                        <div>
                            <Input 
                                label="Title :"
                                type="text" 
                                {...register("title",{
                                required:true
                            })} />
                        </div>
                        <div>
                            <Input 
                                label="Slug :"
                                type="text" 
                                {...register("slug",{
                                required:true
                            })} />
                        </div>
                        <div>
                            <RTE control={control} label="Content :" name="content" defaultValue={getValues("content")} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Input 
                                label="Title :"
                                type="file" 
                                {...register("image",{
                                required:true
                            })} />
                            {
                                post && (
                                    <div>
                                        <img alt="" src={post.File?.ServerRelativeUrl} className='' />
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <Select 
                                label="Status :"
                                options={["active","non-active"]}
                                {...register("status",{
                                    required:true
                                })}

                            />
                        </div>
                        <div>
                            <Button type="submit" className=''>
                                {post ? "Update" : "Submit"}
                            </Button>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}

export default PostForm;