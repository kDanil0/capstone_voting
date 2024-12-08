import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllCandidates, getAllElections, getAllPositions, getAllRegistered, getDepartments, getElectionById, getAllCandidatesByDepartment } from "./api";


export const useFetchDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: () => getDepartments(),
    })
}

//elections
export const useFetchElections = (token) => {
    return useQuery({
        queryKey: ['electionCount'],
        queryFn: () => getAllElections(token),
    })
};

export const useFetchAllRegistered = (token) => {
    return useQuery({
        queryKey: ['allRegistered'],
        queryFn: () => getAllRegistered(token),
    })
}

export const useFetchElectionById = (token, id) => {
    return useQuery({
        queryKey: ['election', id],
        queryFn: () => getElectionById(token, id),
    })
}

//dashboard fetching
export const useFetchDashboard = (token) => {
    return useQueries({
        queries: [
            {
                queryKey: ['electionsData'],
                queryFn: () => getAllElections(token),
            },
            {
                queryKey: ['registeredData'],
                queryFn: () => getAllRegistered(token),
            }
        ]
    })
}

//candidates
export const useFetchCandidates = () => {
    return useQuery({
        queryKey: ['candidates'],
        queryFn: () => getAllCandidates(),
    })
}

//candidates by department
export const useFetchCandidatesByDeptId = (departmentId) => {
    return useQuery({
        queryKey: ['candidatesByDepartment', departmentId],
        queryFn: () => getAllCandidatesByDepartment(departmentId),
    })
}

//positions
export const useFetchPositions = () => {
    return useQuery({
        queryKey: ['positions'],
        queryFn: () => getAllPositions(),
    })
}
