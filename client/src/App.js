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
import { colorPrimary } from './styles/Colors';
import Toggle from './components/UI/Toggle';
import Accordion from './components/UI/Accordion';
import List from './components/UI/List';
import { animated, useTransition } from 'react-spring'

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
	const [accordionOn, accordionToggle] = useState(false)

	//CONTEXT

	//QUERIES
	const [getUsers, { loading: userLoading, error: userError, data: userData }] = useLazyQuery(readAllUsers);

	//MUTATIONS
	const [createUser, createUserResponse] = useMutation(createNewUser)
	//Transitions
	/* const itemTransitions = useTransition(loading ? [] : array, item => item.username, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	}) */
	return (
		<Context.Provider value={context}>

			<Container darkMode={darkMode}>
				<Text darkMode={darkMode} isTitle bold>Client Starter
					<span role="img" aria-label="rocket">🚀</span> (Text)
				</Text>
				<Text darkMode={darkMode} >Deus dormit Et liberi ignem faciunt Numquam extinguunt Ne expergisci possint Omnia dividit Tragedia coram Amandum quae Et nocte perpetua In desperatione Aurora videre potest Mane tempus expergiscendi</Text>

				<Toggle
					darkMode={darkMode}
					text='Dark Mode'
					checked={darkMode}
					onChange={() => setContext({ darkMode: !darkMode })} />

				<Accordion
					centered
					buttonTitle='Toggle Form (Accordion)'
					darkMode={darkMode}
					on={accordionOn}
					toggle={accordionToggle}>
					<form id='form1' style={{ flex: 1 }} onSubmit={e => {
						e.preventDefault()
						createUser({ variables: { username, email, password } })
						setUsername('')
						setPassword('')
						setEmail('')
					}}>
						<Text darkMode={darkMode} centered>(AccordionBody) </Text>
						<Input
							block
							darkMode={darkMode}
							placeholder='Username (Input)'
							value={username}
							onChange={(e) => setUsername(e.target.value)} />

						<Input
							block
							darkMode={darkMode}
							placeholder='Email (Input)'
							value={email}
							onChange={(e) => setEmail(e.target.value)} />

						<Input
							block
							darkMode={darkMode}
							type='password'
							placeholder='Senha (Input)'
							value={password}
							onChange={(e) => setPassword(e.target.value)} />

						<Button darkMode={darkMode} type='confirm' form='form1' value="Submit" block>Enviar (Button)</Button>
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
				</Accordion>

				<Button centered darkMode={darkMode} type='info' onClick={() => getUsers()} >Get Users (Button)</Button>
				{
					userLoading ?
						<Text darkMode={darkMode} bold isTitle centered>Loading...</Text>
						: userError ?
							<Text>Error</Text>
							:
							userData &&
							<List
								canClick
								click={(item) => console.log('Clicou: ', item)}
								array={userData.readAllUsers}
								darkMode={darkMode}
								titleVarName='username'
								descriptionVarName='email' />
				}
			</Container>
		</Context.Provider>
	)
}

export default App;