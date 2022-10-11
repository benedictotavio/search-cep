import { React, useState } from "react"
import '../../src/style.css'
import api from '../components/Api'
import { CgSearchFound } from "react-icons/cg"

export default function Search({ value, handleChange }) {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

    async function handleSearch() {
        console.log(input)
        if (input === "" || input.length < 7) {
            alert('Preencha um CEP')
            setInput('')
        }
        try {
            const resp = await api.get(`${input}/json`)
            setCep(resp.data)
            setInput('')
        } catch {
            window.alert("Erro! Verifique o CEP digitado")
            setInput('')
        }
    }



    const changeInput = (e) => {
        let x = e.target.value
        setInput(x)
    }
    return (
        <>
            <div className="title">
                <h2>Buscar CEP</h2>
            </div>
            <div className="searchZone">
                <input type="text" placeholder="Digite seu CEP..." onChange={changeInput}/>
                <button>
                    <CgSearchFound size={27} onClick={handleSearch} />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <div className="cepBox">
                    <h2>{cep.cep}</h2>
                    <span>{cep.localidade} - {cep.uf}</span>
                    <span>{cep.logradouro}</span>
                    <span>{cep.complemento}</span>
                    <span>{cep.ddd}</span>
                </div>
                
            )}


        </>
    )
}