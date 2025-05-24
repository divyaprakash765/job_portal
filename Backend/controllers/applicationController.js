import { Application } from "../models/application.js";
import Job from "../models/job.js";

export const applyJob = async (req,res)=>{
   try {
    const userId = req.id;
    const jobId = req.params.id;
    if(!jobId){
        return res.status(400).json({
            message:"Job id is required",
            success: false
        });
    };
    const existingApplication = await Application.findOne({job:jobId,applicant:userId});
    if(existingApplication){
        return res.statuts(400).json({
            message: "You have applied for this jobs",
            success: false
        });
    }

    //check if the job exist
    const job = await Job
    if(!job){
      return res.status(404).json({
        message: "Job not found",
        success: false
      })
    }
    // create our new application

    const newApplication = await Application.create({
        job:jobid,
        applicant:userId
    })

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message: "Job applied successfully",
        success: true
    })
   } catch (error) {
    console.log(error);
   }
};

export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{created:-1}},
            populate:{
                path:'company',
                options:{sort:{created:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message: "No Application",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getApplicant = async (req,res)=>{
    try {
        const jobId = req.params;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options:{sort:{createdAt: -1}},
            populate:{
                path:'applicant'
            }
        })
        if(!job){
            return res.status(404).json({
                message:'Job not found',
                success: false
            })
        };

        return res.status({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
             message: "status is required",
             success: false
            })
        }

        // find application by applicant id

        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(400).json({
             message: "Application not found",
             success: false
            })
        }
        
        // update the status

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}