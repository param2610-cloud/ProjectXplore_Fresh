'use client';
import react, { useState } from 'react';
import { CategoryItem } from '@/app/(head)/community/page';

interface CategoryProps {
    category : CategoryItem[];
    number_of_category: number;
}


export function Category({category,number_of_category}:CategoryProps){
    const [SelectedCategory,setSelectedCategory] = useState<number | null>(1);
    const handleCategoryClick = (category:CategoryItem) =>{
        setSelectedCategory(category.id);
    };
    return(
        <>
        {   
                    category.slice(0,number_of_category).map((item:CategoryItem)=>{
                        const isSelected = SelectedCategory===item.id?true : false ;
                        return(
                            <div id={item.id.toString()} onClick={()=>handleCategoryClick(item)} className={`${isSelected?' border-solid border-b-4 border-[#DF5173]':''} flex-shrink cursor-pointer text-[14px] px-[11px]` }>
                                <p className={isSelected ? 'text-[#DF5173]' : ''}>{item.title}</p>
                            </div>
                        )
                    })
                }
        </>
    )
}