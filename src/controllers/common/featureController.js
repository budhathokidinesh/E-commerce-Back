import Feature from "../../models/Features.js";

//this is for adding feature image
export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    const featureImages = new Feature({
      image,
    });
    await featureImages.save();
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error occured",
    });
  }
};
//this is for getting feature image
export const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error occured",
    });
  }
};
