import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { readAllUsers } from './apollo/queries';
import { createNewUser } from './apollo/mutations';
import { create } from 'istanbul-reports';

function App() {
	//REFS

	//STATE
	const [showForm, setShowForm] = useState(true)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	//QUERIES
	// const { loading, error, data, refetch } = useQuery(readAllUsers); //Executa imediatamente
	const [getUsers, { loading, error, data }] = useLazyQuery(readAllUsers); //Cria uma function (primeiro parametro getUsers) para ser executada no futuro

	//MUTATIONS
	const [createUser, createUserResponse] = useMutation(createNewUser)
	return (
		<div style={{ padding: 20 }}>
			<h2>My first Apollo app <span role="img" aria-label="rocket">🚀</span></h2>
			<button onClick={() => setShowForm(!showForm)}>Show Form</button>
			<button onClick={() => getUsers()}>Get data</button>
			<br />
			{
				showForm ?
					<form style={{ width: '100%', flexDirection: 'row' }} onSubmit={e => {
						e.preventDefault()
						createUser({ variables: { username, email, password } })
						// setUsername('')
						// setPassword('')
						// setEmail('')
					}}>
						<div style={{ flex: 1 }}>
							<input placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} />
							<br />
							<input placeholder='Email' type='email' onChange={e => setEmail(e.target.value)} />
							<br />
							<input placeholder='Senha' type='password' onChange={e => setPassword(e.target.value)} />
							<br />
							<input type='submit' />
						</div>
						<div style={{ flex: 1 }}>
							{
								createUserResponse.error && createUserResponse.error.graphQLErrors[0].messages.map(error =>

									<p style={{ color: 'red', padding: 10, background: 'lightgray' }} >
										{error}
									</p>
								)
							}
						</div>
					</form >

					:
					null
			}
			{
				loading ?
					<p>Loading...</p>
					: error ?
						<p>Error</p>
						:
						data && data.readAllUsers.map(user => {
							return (
								<div style={{ backgroundColor: 'gray', margin: 5, padding: 5 }} key={user.username}>
									<p><strong>Username: </strong>{user.username}</p>
									<h5>Roles:</h5>
									<ul>
										{user.roles.map(role => <li key={role.name}>{role.name}</li>)}
									</ul>
								</div>
							)
						})
			}
		</div >
	)
}

export default App;
