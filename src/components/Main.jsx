import { useState } from "react"
import GetDatafromApi from "./Api"

export default function Main() {

    const [data, Setdata] = useState([]);
    const [messages, Setmessages] = useState("");
    const [loading, Setloading] = useState(false);
    const [error, Seterror] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Setmessages((prevMessages) => [...prevMessages, {type: "user", messages: data}] )
        Setmessages("")
    }
    const getMessages = async () => {
      if (messages.trim() !== "") {
        Setloading(true);
        try {
          const message = await GetDatafromApi(messages);
          Setdata([message]);
          Setmessages((prevMessages) => [
            ...prevMessages,
            { type: "assistant", message: message },
          ]);
          Setmessages("");
          Setloading(false);
          Seterror("");
        } catch (error) {
          console.log(error);
        }
      } else {
        Seterror("No puede ingresar un campo vacio.");
      }
    };
  
    
    return (
      <main className="contenedor-main">
        <h1>ChatGPT Express</h1>
        <h3> Pregunta lo que quieras.</h3>
        <form className="contenedor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => Setmessages(e.target.value)}
            value={messages}
            placeholder="Escribe aqui..."
          ></input>
          <button className="contenedor-button" type="submit" onClick={getMessages}>
            Buscar
          </button>
        </form>
          {error && <p>{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="contenedor-data">
            <p className="data-transition">{data.length > 0 && data[0].content}</p>
          </div>
        )}
      </main>
    );
}