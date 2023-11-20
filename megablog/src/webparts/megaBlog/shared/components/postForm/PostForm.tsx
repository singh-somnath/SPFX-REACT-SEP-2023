import * as React from 'react';
import {useForm} from "react-hook-form";
import {Input,Button,Select,RTE,DatePickerComponent,ComboBoxComponent} from '../index';
import {updateFileMetaData,uploadFeatureImage} from '../../services/BlogService';
import { IBlogDetail, IBlogDetailPostItem } from '../../interface/IBlogDetail';
import { useSelector } from 'react-redux';
import { IStateType } from '../../store/authSlice';
import styles  from './PostForm.module.scss';
import { useNavigate } from 'react-router-dom';
import {IComboBoxOption, MessageBar, MessageBarType} from '@fluentui/react';
import { useState,useEffect } from 'react';
import {getAllSiteUsers} from '../../services/UserService';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';

interface IFormValues{
    title:string;
    slug:string;
    content:string;
    status:string;
    image:any;
    blogDate:string;
    blogPerson: number;
}

interface IPostType{
    post ?: IBlogDetail;
}

  
function PostForm({post}:IPostType){
    const[loader,setLoader] = useState(true); 
    const[options,setOptions] = useState<IComboBoxOption[]>([]);
    const[messageStatus,setMessageStatus] = useState(false);
    const[message,setMessage] = useState<string>("");
    const[messageBarType,setMessageBarType] = useState<MessageBarType>(MessageBarType.info);
   const navigate = useNavigate();
    const currenUSerEmail = useSelector((state:IStateType)=>state.sessionData?.UserEmail);
    
    useEffect(()=>{
        setLoader(true);
        getAllSiteUsers().then((items:ISiteUserInfo[]) => {
            let currentOptions : IComboBoxOption[] = [];
            items.map(item =>  currentOptions.push({key: item.Id, text:item.Title }));
            setOptions(currentOptions);
            setLoader(false);
        });
    },[])
    
    const {register,handleSubmit,control,getValues,reset,formState:{errors}} = useForm<IFormValues>({
        defaultValues:{
            title:post?.BlogTitle || "",
            slug:post?.BlogSlug || "",
            content:post?.BlogContent || "",
            status:post?.BlogStatus || "",
            blogDate : post?.BlogDate || "",
            blogPerson : post?.BlogPerson?.ID || undefined
        }
    });

    const onFormSubmission = async (data:any) =>{   
        
        if(post && post.Id && post.File?.Name)
        {
            let fileName:string = post.File?.Name;
            if(data.image.length)
            {
                const file = data.image[0];                
                await uploadFeatureImage(file,fileName);
                fileName = file?.name;
            }
                          
            const inputData:IBlogDetailPostItem = {
                BlogTitle : data.title,
                BlogSlug : data.slug, 
                BlogContent : data.content,
                BlogStatus: data.status,
                UserEmail : currenUSerEmail ?  currenUSerEmail : "",
                FileLeafRef : fileName,
                BlogDate : (new Date(data.blogDate)).toISOString(),
                BlogPersonId : data.blogPerson,          
            }
            try{
                const metaDataUpdate = await updateFileMetaData(inputData,post.Id);
                if(metaDataUpdate)
                {
                    
                    setMessageStatus(true);
                    setMessage("Data updated successfully");
                    setMessageBarType(MessageBarType.success);
                    setTimeout(() => {
                        navigate("/allpost");
                    }, 1000);
                }
            }catch(error){
                setMessageStatus(true);
                setMessage("Error in data update.");
                setMessageBarType(MessageBarType.error);
            }
                         
        }  
        else
        {
            const file = data.image[0];
            const fileName:string = file?.name;

            const fileNamePart = fileName.split('.');
            const newFileName = fileNamePart[0] + Date.now() + "."+ fileNamePart[1];

           /* const users : IPostMultiLookupType = {
                results : [...data.blogPerson]
            }*/

            const uploadedImage = await uploadFeatureImage(file,newFileName);
            if(uploadedImage.ID){                   

                const inputData:IBlogDetailPostItem = {
                    BlogTitle : data.title,
                    BlogSlug : data.slug, 
                    BlogContent : data.content,
                    BlogStatus: data.status,
                    UserEmail : currenUSerEmail ? currenUSerEmail : "",
                    BlogPersonId  :  data.blogPerson,
                    FileLeafRef : fileName,
                    BlogDate : (new Date(data.blogDate)).toISOString()
                }
                try{
                    const metaDataUpdate = await updateFileMetaData(inputData,uploadedImage.ID);
                    reset();
                    console.log("Data Updated",metaDataUpdate);
                    setMessageStatus(true);
                    setMessage("Data Inserted successfully");
                    setMessageBarType(MessageBarType.success);
                    //navigate("/allpost");
                }catch(error){                  
                    setMessageStatus(true);
                    setMessage("Error in data insert.");
                    setMessageBarType(MessageBarType.success);
                }
            }
        }  
    }

    const resetMessageBar = () =>{
        setMessage("");
        setMessageStatus(false);
        setMessageBarType(MessageBarType.info);
    }

    return(
       !loader ?
            <div>
                
                <form onSubmit={handleSubmit(onFormSubmission)}>
                    <div className={styles.postFormContainer}>
                        <div>
                            {messageStatus ? <MessageBar messageBarType={messageBarType} onDismiss={resetMessageBar} dismissButtonAriaLabel='close' isMultiline={true} >{message}</MessageBar> : null}
                        </div>
                        <div className={styles['postFormContainer-mainContainer']}>
                            <div  className={styles['postFormContainer-mainContainer-left']}>                      
                                    <Input 
                                        label="Title :"
                                        type="text" 
                                        {...register("title",{
                                        required:true
                                        })}
                                        ariaInvalid={errors.title ? true : false} 
                                        ariaInvalidType =  {errors.title ? errors.title.type : null} 
                                    />
                                    <Input 
                                        label="Slug :"
                                        type="text" 
                                        {...register("slug",{
                                                required:true
                                        })}
                                        ariaInvalid={errors.slug ? true : false} 
                                        ariaInvalidType =  {errors.slug ? errors.slug.type : null} 
                                    />                        
                                    <RTE 
                                        control={control} 
                                        label="Content :" 
                                        name="content" 
                                        defaultValue={getValues("content")} 
                                        ariaInvalid={errors.content ? true : false}
                                        isRequired = {true}
                                        ariaInvalidType =  {errors.content ? errors.content.type : null} 
                                    />                        
                            </div>
                            <div className={styles['postFormContainer-mainContainer-right']}>
                                <Input 
                                        label="Image :"
                                        type="file" 
                                        {...register("image",{
                                            required: !post ? true : false
                                        })} 
                                        ariaInvalid={errors.image ? true : false}
                                        ariaInvalidType =  {errors.image ? errors.image.type : null} 
                                    />
                                    {}
                                    {
                                        post && (
                                            <div className={styles['postFormContainer-mainContainer-right-imageContainer']}>
                                                <img alt="" src={post.File?.ServerRelativeUrl} className='' />
                                            </div>
                                        )
                                    }
                                <Select 
                                        label="Status :"
                                        options={["active","non-active"]}
                                        {...register("status",{
                                            required:true
                                        })}
                                        ariaInvalid={errors.status ? true : false}
                                        ariaInvalidType =  {errors.status ? errors.status.type : null} 
                                />    

                                <DatePickerComponent 
                                    label="Date :"
                                    name="blogDate"
                                    control={control}
                                    ariaInvalid={errors.blogDate ? true : false}
                                    ariaInvalidType =  {errors.blogDate ? errors.blogDate.type : null} 
                                    isRequired={true}
                                    defaultValue={getValues("blogDate") ? new Date(getValues("blogDate")) : undefined} 
                                />      
                                <ComboBoxComponent 
                                    label="Users :"
                                    name="blogPerson"
                                    control={control}
                                    ariaInvalid={errors.blogPerson ? true : false}
                                    keys={getValues("blogPerson") ? [getValues("blogPerson")] : []}
                                    ariaInvalidType =  {errors.blogPerson ? errors.blogPerson.type : undefined} 
                                    isRequired={true}
                                    optionsList={options ? options : []}
                                    isMultiSelect = {false}
                                />                          
                            </div>
                        </div>                    
                        <div className={styles['postFormContainer-bottomContainer']}>
                            <Button type="submit">
                                {post ? "Update" : "Submit"}
                            </Button>
                        </div>   
                    </div>                              
                </form>
            </div>
        : <div>
              <h1>Loading...</h1>
          </div>
       
    );
}

export default PostForm;