import profession from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import { useEffect, useState } from 'react';
import httpsService from '../services/http.service';

const useMocData = () => {
    const statusConst = {
        idle: 'Not Started',
        pending: 'In process',
        succeed: 'Ready',
        error: 'Error occured'
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = profession.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConst.succeed);
        }
    };

    useEffect(() => {
       updateProgress();
    }, [count]);

    async function initialise() {
        try {
            for (const prof of profession) {
                await httpsService.put('profession/' + prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await httpsService.put('user/' + user._id, user);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpsService.put('quality/' + quality._id, quality);
                incrementCount();
            }
        } catch (err) {
            setError(err);
            setStatus(statusConst.error);
        }
    }
    return { error, initialise, progress, status };
};
export default useMocData;
