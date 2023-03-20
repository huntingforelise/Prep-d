import  Interview  from '../models/interview';
import { Request, Response } from "express";


exports.getInterviewsByUser = async function (req: Request, res: Response) {
  try {
    const userName = req.params.username;
    const interviews = await Interview.find({username: userName}).sort({date: -1}); //TODO asc/desc {date: 1}
    if (interviews.length < 1){
      throw new Error("No previous interviews found");
    }
    res
      .status(200)
      .json(interviews);
  } catch (err: any) {
    res
      .status(500)
      .json(err.message);
  }
};

exports.getInterview = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let result = await Interview.findById(id);
     res
      .json(result)
      .status(200);
  } catch (err: any) {
     res
      .status(500)
      .json(err.message);
  }
};


exports.newInterview =  async (req : Request, res: Response) => {
  try {
    let interview = await Interview.create(
      {
        username: req.params.username,
        level: req.body.level,
        questions:[]
      });
      console.log('Interview created');
      res
        .status(201)
        .json(interview);
    } catch (err: any) {
        console.log(err);
      res
        .status(500)
        .json(err.message);
    }
};

function getQuestionFromChatGPT (level:String, jobType:String, questionType:String) : String {
  // Calls chatGPT to get an interview question for a certain level for a certain job type
  // of questionType either "Behavioural" or "Coding"
  // Returns the text of the answer obtained from chatGPT
  // TODO: implement
  throw Error("Function not implemented")
}


exports.addQuestionToInterview =  async (req : Request, res: Response) => {
  //TODO: clarify if chatGPT calls are going to be made client side or
  // server side -  API design will change accordingly
  // ATM this function might not be useful (but works :) )
  try {
    const interview_id = req.params.id;
    const { question_text, answer_text, answer_audio_url, score } = req.body;

    const newQuestion = {
      question_text,
      answer_text,
      answer_audio_url,
      score,
      timestamp: Date.now(),
    };

    const interview = await Interview.findOneAndUpdate(
      { _id: interview_id },
      { $push: { questions: newQuestion } },
      { new: true }
    );

    if (!interview) {
      return res
        .status(404)
        .json({ error: 'Interview not found' });
    }
    return res
      .status(201)
      .json(newQuestion);
  } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Server error' });
  }
}
