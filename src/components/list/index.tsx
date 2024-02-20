import style from './list.module.css'
import Confirm from '../../assets/check.svg?react'
import Edit from '../../assets/pencil.svg?react'
import Delete from '../../assets/trash.svg?react'
import { IToDo } from '../../pages/home'
import { ChangeEvent, ForwardRefRenderFunction, createRef, forwardRef, useImperativeHandle, useMemo } from 'react'

interface IProps {
    toDos: IToDo[]
    deleteToDo: (id:string)=>void
    completeToDo: (id:string)=>void
    editToDo: (id:string, event:ChangeEvent<HTMLInputElement>)=>void
}
interface IListRef {
    focus: (index:number)=>void
}

const ListBase: ForwardRefRenderFunction<IListRef, IProps> = ({toDos, deleteToDo, completeToDo, editToDo}, ref) => {
    const  inputRefs = useMemo(()=>
        Array(toDos.length).fill(0).map(()=>createRef<HTMLInputElement>())
    ,[toDos.length])
    useImperativeHandle(ref, ()=>({
        focus: (index: number)=>{
            inputRefs[index].current?.focus()
        }
    }))
    const handleToDoBlur = (index: number)=>{
        inputRefs[index].current?.focus()
    }
    return(
        <>
            {toDos.map((toDo, index)=>(
                <div className={style.card} key = {index}>
                {toDo.completed ? (
                    <>
                    <input type='text' value={toDo.description} className={style.inputCompleted} disabled/>
                    <div className={style.icon}>
                            <Delete onClick={() => deleteToDo(toDo.id)} />
                        </div>
                    </>
                ):(
                    <>
                        <input type='text' value={toDo.description} ref={inputRefs[index]} onChange={(event)=>editToDo(toDo.id, event)} />
                        <div className={style.icon}>
                            <Confirm onClick={() => completeToDo(toDo.id)} />
                            <Edit onClick={() => handleToDoBlur(index)} />
                            <Delete onClick={() => deleteToDo(toDo.id)} />
                        </div>
                    </>
                )}
                </div>
            ))}
        </>
    )
}

export const List = forwardRef(ListBase)