// import { defineCustomElements } from '@briza/air'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { WORKER_COMPENSATION, CREATE_PRE_APP, BUISNESS_CLASS, SUBMIT_PRE_ANSWER } from 'constants/api';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet'
import usePatch from 'hooks/usePatch';
import BusinessClassData from "./businessClass.json"
// import QuestionAir from "./QuestionAir.json"
import WorkerCompensation from "./WorkerCompensation.json"
import useMetaData from 'context/useMetaData';

const AirBriza = () => {

    const navigate = useNavigate();
    const { mutateAsync: getQuestionList } = usePost();
    const { mutateAsync: getWorkerCompensation } = useGet();
    const { mutateAsync: getBusinessClasses } = useGet();
    const { mutateAsync: submitAnswers } = usePatch();
    const [questionList, setQuestionList] = useState({});
    const [workerCompensation, setWorkerCompensation] = useState({});
    const [buisnessClasses, setBuisnessClasses] = useState();
    const [answers, setAnswers] = useState({})
    const brokerage_id = process.env.REACT_APP_BROKERAGE_ID
    const {preAppId, setPreAppId} = useMetaData();

    const getQuestionsList = async () => {
        const payload = {
            "brokerageId": brokerage_id,
            "links": [
                { "type": "brokerage" }
            ]
        };
        const res = await getQuestionList({
            url: CREATE_PRE_APP,
            payload,
        })
        localStorage.setItem('preAppId', res?.id)
        setPreAppId(res?.id)
        setQuestionList(res)
        console.log(res, "------->>respinse")
    }

    const stateWorkerCompensation = async () => {
        const states = [
            'AK',
            'AL',
            'AR',
            'AZ',
            'CA',
            'CO',
            'CT',
            'DE',
            'DC',
            'FL',
            'GA',
            'HI',
            'IA',
            'ID',
            'IL',
            'IN',
            'KS',
            'KY',
            'LA',
            'MA',
            'MD',
            'ME',
            'MI',
            'MN',
            'MO',
            'MS',
            'MT',
            'NC',
            'ND',
            'NE',
            'NH',
            'NJ',
            'NM',
            'NV',
            'NY',
            'OH',
            'OK',
            'OR',
            'PA',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VA',
            'VT',
            'WA',
            'WI',
            'WV',
            'WY',
        ]
        const localWorkersCompensationClasses = {}
        states.forEach(async (state) => {
            const res = await getWorkerCompensation({
                url: `${WORKER_COMPENSATION}?state=${state}`
            }).catch((err) => {
                console.log('error --->', err)
            })
            localWorkersCompensationClasses[state] = res.data
        })

        console.log('worker compensattion', localWorkersCompensationClasses)
        setWorkerCompensation(localWorkersCompensationClasses)
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
        stateWorkerCompensation();
        getBuisnessClass();
        getQuestionsList();
    }, []);

    useEffect(() => {
        if (!!Object.keys(questionList).length && !!Object.keys(workerCompensation).length) {
            const questionnaire = document.querySelector('air-questionnaire')
            questionnaire.businessClasses = BusinessClassData.data;
            questionnaire.workersCompensationClassesByState = workerCompensation;

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
    }, [questionList, workerCompensation])

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
                        url: `${SUBMIT_PRE_ANSWER}/${preAppId}`,
                        payload
                    }).then((res) => {
                        console.log('submitted ansers --->', res)
                        navigate('/create-app')
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

export default AirBriza