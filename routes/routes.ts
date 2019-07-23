import { Router,Request, Response } from "express";

export const router = Router();

router.get('/messages',(req:Request,res:Response)=>{
    res.json({
        status:true,
        message:`It's Ok`
    })
});

router.post('/messages',(req:Request,res:Response)=>{

    const body= req.body.body;
    const from= req.body.from;
    
    res.json({
        status:true,
        message:`It's Ok - post`,
        body,
        from
    })

});

router.post('/messages/:id',(req:Request,res:Response)=>{

    const id  = req.params.id;
    
    res.json({
        status:true,
        message:`It's Ok - post`,
        id
    })
    
});