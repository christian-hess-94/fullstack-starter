import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { readAllUsers } from './apollo/queries';
import { createNewUser } from './apollo/mutations';
import Input from './components/Input/Input';
import Container from './components/Container/Container';

function App() {
	//Apollo Client
	const client = useApolloClient();
	//STATE
	const [showForm, setShowForm] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [darkMode, setDarkMode] = useState(false)
	//QUERIES
	// const { loading, error, data, refetch } = useQuery(readAllUsers); //Executa imediatamente
	const [getUsers, { loading, error, data }] = useLazyQuery(readAllUsers); //Cria uma function (primeiro parametro getUsers) para ser executada no futuro

	//MUTATIONS
	const [createUser, createUserResponse] = useMutation(createNewUser)
	return (
		<Container darkMode={darkMode}>
			<h2>Client Starter <span role="img" aria-label="rocket">🚀</span></h2>

			<button onClick={() => {
				console.log('Chamando button click')
				client.writeData({ data: { darkMode: true } })
			}}>{darkMode ? 'Dark mode is set' : 'Dark mode not set'}</button>
			<button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide form' : 'Show form'}</button>
			<button onClick={() => getUsers()}>Get Users</button>
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
							<Input
								placeholder='Username'
								value={username}
								darkMode={darkMode}
								onChange={setUsername} />
							<br />
							<Input
								placeholder='E-mail'
								value={email}
								darkMode={darkMode}
								onChange={setEmail} />
							<br />
							<Input
								placeholder='Senha'
								value={password}
								darkMode={darkMode}
								onChange={setPassword} />

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
		</Container>
	)
}

export default App;
