import React, { useState, useEffect, useCallback, useContext } from 'react';
import './App.css';
import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import { readAllUsers } from './apollo/queries';
import { createNewUser } from './apollo/mutations';

import Input from './components/UI/Input';
import Container from './components/UI/Container';
import Button from './components/UI/Button';
import Text from './components/UI/Text';
import Card from './components/UI/Card';
import NavBody from './components/UI/Navbar/NavBody';

const Context = React.createContext()

function App() {
	//GLOBAL STATE
	const [context, setContext] = useState({
		darkMode: false,
		daltonicMode: false,
	})
	const { darkMode } = context

	//STATE
	const [showForm, setShowForm] = useState(true)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	//CONTEXT

	//QUERIES
	const [getUsers, { loading: userLoading, error: userError, data: userData }] = useLazyQuery(readAllUsers);
	//MUTATIONS
	const [createUser, createUserResponse] = useMutation(createNewUser)
	return (
		<Context.Provider value={context}>
			<Container darkMode={darkMode}>
				<Text darkMode={darkMode} title bold>Client Starter<span role="img" aria-label="rocket">🚀</span></Text>
				<Text darkMode={darkMode} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies quam turpis, sed porttitor lectus condimentum quis. Morbi dictum sodales convallis.</Text>

				<Button block darkMode={darkMode} type='dark' onClick={() => {
					setContext({ darkMode: !darkMode })
				}}>Toggle Dark Mode</Button>

				<Button block darkMode={darkMode} type='warning' onClick={() => setShowForm(!showForm)}>Toggle Form</Button>

				{
					showForm ?
						<Card darkMode={darkMode}>
							<form id='form1' style={{ flex: 1 }} onSubmit={e => {
								e.preventDefault()
								createUser({ variables: { username, email, password } })
							}}>
								<Input
									block
									darkMode={darkMode}
									placeholder='Username'
									value={username}
									onChange={(e) => setUsername(e.target.value)} />
								<br />

								<Input
									block
									darkMode={darkMode}
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)} />
								<br />

								<Input
									block
									darkMode={darkMode}
									type='password'
									placeholder='Senha'
									value={password}
									onChange={(e) => setPassword(e.target.value)} />
								<br />

								<Button darkMode={darkMode} type='default' form='form1' value="Submit" block >Enviar</Button>

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
						</Card>
						:
						null
				}

				<Button block darkMode={darkMode} type='info' onClick={() => getUsers()}>Get Users</Button>
				{
					userLoading ?
						<p>Loading...</p>
						: userError ?
							<p>Error</p>
							:
							userData && userData.readAllUsers.map(user => {
								return (
									<Card darkMode={darkMode} key={user.username}>
										<Text darkMode={darkMode} bold>Username: {user.username}</Text>
										<Text darkMode={darkMode}>Roles:</Text>
										<ul>
											{user.roles.map(role => <Text darkMode={darkMode} key={role.name}>{role.name}</Text>)}
										</ul>
									</Card>
								)
							})
				}
			</Container>
		</Context.Provider>
	)
}

export default App;