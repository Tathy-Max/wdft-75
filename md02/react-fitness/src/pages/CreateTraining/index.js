import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CreateTraining() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner: "",
    goals: "",
    muscleGroup: "",
    weekWorkout: {},
  });

  const [day, setDay] = useState("segunda");

  const [trainingByDay, setTrainingByDay] = useState({
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: [],
  });

  const [exercise, setExercise] = useState({
    exercise: "supino",
    series: 0,
    reps: 0,
  });

  console.log(form, trainingByDay, exercise);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDay(e) {
    setDay(e.target.value);
  }

  function handleChangeExercise(e) {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  }

  function handleAddExercise() {
    setTrainingByDay({
      ...trainingByDay,
      [day]: [...trainingByDay[day], exercise],
    });
  }

  function handleAddDayOfWorkout() {
    setForm({ ...form, weekWorkout: trainingByDay });
    toast.success("Seu treino está pronto para ser enviado!");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/react-fitness", form);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <h1>Crie o seu treino:</h1>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="d-flex flex-column m-5">
          <h2>Dados pessoais:</h2>
          <label htmlFor="owner-input">Seu nome:</label>
          <input
            id="owner-input"
            value={form.owner}
            type="string"
            name="owner"
            onChange={handleChange}
            required
          />
          <label htmlFor="goals-input">Objetivos:</label>
          <input
            id="goals-input"
            value={form.goals}
            type="string"
            name="goals"
            onChange={handleChange}
          />
          <label htmlFor="muscleGroup-input">Grupo muscular:</label>
          <input
            id="muscleGroup-input"
            value={form.muscleGroup}
            type="string"
            name="muscleGroup"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column m-5">
          <h2>Dias de treino:</h2>
          <label htmlFor="day-input">Dia:</label>
          <select id="day-input" name="day" onChange={handleDay}>
            <option value="segunda">Segunda</option>
            <option value="terca">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="sabado">Sabado</option>
            <option value="domingo">Domingo</option>
          </select>

          <div className="d-flex flex-column m-5">
            <h2>Treinos adcionados:</h2>
            <p>Dia:</p> <strong>{day}</strong>
            <ul>
              {trainingByDay[day].map((currentWorkout) => {
                return (
                  <li>
                    <p>Exercicio:</p> <strong>{currentWorkout.exercise}</strong>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddDayOfWorkout}
          >
            Adicionar treino da semana
          </button>

          <div className="d-flex flex-column m-5">
            <h2>Adicionar exercicio</h2>
            <label htmlFor="exercise-input">Exercicios:</label>
            <select
              id="exercise-input"
              name="exercise"
              onChange={handleChangeExercise}
            >
              <option value="supino">Supino</option>
              <option value="levantamento-terra">Levantamento terra</option>
              <option value="agachamento">Agachamento</option>
            </select>
            <label htmlFor="series-input">Numero de series:</label>
            <input
              id="series-input"
              type="number"
              value={exercise.series}
              onChange={handleChangeExercise}
              name="series"
            />
            <label htmlFor="reps-input">Numero de reps:</label>
            <input
              id="reps-input"
              type="number"
              value={exercise.reps}
              onChange={handleChangeExercise}
              name="reps"
            />
            <button type="button" onClick={handleAddExercise}>
              Adicionar exercicio
            </button>
          </div>
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </>
  );
}
