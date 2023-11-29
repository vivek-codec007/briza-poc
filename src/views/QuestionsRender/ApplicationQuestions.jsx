// import { defineCustomElements } from '@briza/air'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { WORKER_COMPENSATION, CREATE_APP, BUISNESS_CLASS } from 'constants/api';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet'
import usePatch from 'hooks/usePatch';
import BusinessClassData from "./businessClass.json"
// import QuestionAir from "./QuestionAir.json"
import WorkerCompensation from "./WorkerCompensation.json"
import useMetaData from 'context/useMetaData';

const ApplicationQuestions = () => {

    const navigate = useNavigate();
    const { mutateAsync: getQuestionList } = usePost();
    const { mutateAsync: getBusinessClasses } = useGet();
    const { mutateAsync: submitAnswers } = usePatch();
    const [questionList, setQuestionList] = useState({});
    const [workerCompensation, setWorkerCompensation] = useState({});
    const [buisnessClasses, setBuisnessClasses] = useState();
    const [answers, setAnswers] = useState({})
    const brokerage_id = process.env.REACT_APP_BROKERAGE_ID
    const {setAppId, appId} = useMetaData();

    const getQuestionsList = async () => {
        const payload = {
            "preApplicationId": localStorage.getItem('preAppId') 
        };
        const res = await getQuestionList({
            url: CREATE_APP,
            payload,
        })
        console.log(res, "------->>respinse")
        localStorage.setItem('appId', res?.id)
        setAppId(res?.id)
        setQuestionList(res)
    }

    const getBuisnessClass = async () => {
        const buisnessClass = await getBusinessClasses({
            url: BUISNESS_CLASS
        }).catch((err) => {
            console.log('error --->', err)
        })
        console.log('buisness class --->', buisnessClass)
        setBuisnessClasses(buisnessClass)
    }

    useEffect(() => {
        // stateWorkerCompensation();
        // getBuisnessClass();
        getQuestionsList();
    }, []);

    useEffect(() => {
        if (!!Object.keys(questionList).length) {
            const questionnaire = document.querySelector('air-questionnaire')
            // questionnaire.businessClasses = BusinessClassData.data;
            // questionnaire.workersCompensationClassesByState = WorkerCompensation;

            questionnaire.questions = questionList.questionnaire.questions
            questionnaire.sections = questionList.questionnaire.layout
            questionnaire.addEventListener('air-questionnaire-update', function (event) {
                if (event.detail.completed) {
                    console.log('get event--->', event)
                    setAnswers(event.detail.answers)
                    // Questionnaire is valid
                    // proceed to next step
                }
            })
            
        }
    }, [questionList])

    useEffect(() => {
        const submitBtn = document.querySelector('air-button')
        if (!!Object.keys(answers).length) {
        submitBtn.addEventListener('click', async function () {
            // Your click event logic here
            // document.querySelector('air-questionnaire').validate()
                const payload = {
                    answers: answers
                }
                submitAnswers({
                    url: `applications/${appId}`,
                    payload
                }).then((res) => {
                    console.log('submitted ansers --->', res)
                    setAppId(res?.id)
                    navigate('/create-quote')
                })
            })
        }
    }, [answers])
    

    return (
        <>
            {/* {defineCustomElements()} */}
            {!!Object.keys(questionList).length && <air-questionnaire id="pre-questions"></air-questionnaire>}
            {!!Object.keys(questionList).length && <air-button type="submit" variant="primary">Submit</air-button>}
        </>
    )
}

export default ApplicationQuestions