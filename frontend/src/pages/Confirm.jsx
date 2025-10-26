import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

const Confirm = () => {
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {

        const url = `http://localhost:4000/api/veterinarians/confirm/${id}`
        const { data } = await axios(url)

        console.log(data)

      } catch (error) {
        console.log(error)
      }
    }
    confirmAccount();
  }, [])


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y Comienza a Administra tus
          <span className="text-black"> Pacientes </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">

      </div>
    </>
  )
}

export default Confirm
