import { ChangeEvent, useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { List } from '../../components/list'
import styles from './home.module.css'
import {v4 as uuid} from 'uuid'

export interface IToDo {
    id:string;
    description: string;
    completed: boolean;
}

export function Home(){
    const [toDo, setToDo] = useState<string>('')
    const [toDos, setToDos] = useState<IToDo[]>([])
    const [totalInProgress, SetTotalInProgress] = useState(0)
    const [totalCompleted, SetTotalCompleted] = useState(0)
    const [pText, SetPText] = useState('s')
    const [cText, SetCText] = useState('s')
    useEffect(()=>{
        const newTotalInProgress = toDos.reduce((previusValue, current)=>(!current.completed ? previusValue + 1 : previusValue), 0)
        SetTotalInProgress(newTotalInProgress)
        newTotalInProgress <=1 ? SetPText('') : SetPText('s')
        const newTotalCompleted = toDos.reduce((previusValue, current)=>(current.completed ? previusValue + 1 : previusValue), 0)
        SetTotalCompleted(newTotalCompleted)
        newTotalCompleted <=1 ? SetCText('') : SetCText('s')
    },[toDos])
    const addToDo = ()=>{
        const newToDo ={id: uuid(), description: toDo, completed: false}
        !newToDo.description ? document.getElementById('campoTxt').focus() : setToDos([... toDos, newToDo])
        setToDo('')
    }
    const deleteToDo = (id:string)=>{
        const filterToDos = toDos.filter(toDo => toDo.id !== id)
        setToDos(filterToDos)
    }
    const completeToDo = (id: string)=>{
        const newToDosState = toDos.map((toDo)=>{
            if(toDo.id === id){
                return {... toDo, completed: !toDo.completed}
            }else{
                return toDo
            }
        })
        setToDos(newToDosState)
    }
    const editToDo = (id: string, event: ChangeEvent<HTMLInputElement>)=>{
        const newToDosState = toDos.map(toDo => {
            if (toDo.id === id){
                return{
                    ... toDo, description: event.target.value
                }
            }
            return toDo
        })
        setToDos(newToDosState)
    }
    return(
        <div>
            <Header />
            <div className={styles.createTask}>
                <input id='campoTxt' type="text" value={toDo} onChange={(e)=>setToDo(e.target.value)} />
                <button onClick={addToDo}>Adicionar</button>
            </div>
            <div className={styles.filter}>
                <span className={styles.finish}>{totalCompleted} Tarefa{cText} finalizada{cText}</span>
                <span className={styles.progress}>{totalInProgress} Tarefa{pText} em progresso</span>
            </div>
            <List toDos={toDos} deleteToDo={deleteToDo} completeToDo={completeToDo} editToDo={editToDo} />
        </div>
    )
}