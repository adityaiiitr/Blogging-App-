import Category from "../models/category";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    // console.log("saved category", category);
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

//if the get doesnt find data in database then it will return an empty  array so less chance of error
export const categories = async (req,res)=>{
  try{
    const categories = await Category.find().sort({createdAt:-1})
    res.json(categories)


  }catch(err){
    console.log(err);
  }
}