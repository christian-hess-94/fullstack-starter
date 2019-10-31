import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import { readAllUsers } from './apollo/queries';
import { createNewUser } from './apollo/mutations';

import Input from './components/UI/Input';
import Container from './components/UI/Container';
import Button from './components/UI/Button';
import Text from './components/UI/Text';
import Card from './components/UI/Card';
import NavBar from './pages/menu/NavBar';
import { colorPrimary } from './styles/Colors';
import Toggle from './components/UI/Toggle';
import Accordion from './components/UI/Accordion';
import List from './components/UI/List';
import { animated, useTransition } from 'react-spring'
import Row from './components/UI/Row';

export const ThemeContext = React.createContext()

function App() {
	//GLOBAL STATE
	const [context, setContext] = useState({
		darkMode: false,
		daltonicMode: false,
	})
	const { darkMode } = context

	//STATE
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [accordionOn, accordionToggle] = useState(false)
	const [formOn, formToggle] = useState(false)

	//CONTEXT

	//QUERIES
	const [getUsers, { loading: userLoading, error: userError, data: userData }] = useLazyQuery(readAllUsers);

	//MUTATIONS
	const [createUser, createUserResponse] = useMutation(createNewUser)
	return (
		<ThemeContext.Provider value={context}>
			<Container>
				<NavBar />
				{/* <Text isTitle bold>Framework Starter
					<span role="img" aria-label="rocket">🚀</span>
				</Text>
				<Text isTitle bold centered>Text</Text>
				<Text >Deus dormit Et liberi ignem faciunt Numquam extinguunt Ne expergisci possint Omnia dividit Tragedia coram Amandum quae Et nocte perpetua In desperatione Aurora videre potest Mane tempus expergiscendi</Text>
				<Text centered isTitle bold>Toggle</Text>
				<Toggle
					position='center'
					text='Dark Mode'
					checked={darkMode}
					onClick={() => setContext({ darkMode: !darkMode })} />

				<Accordion
					type='warning'
					buttonTitle='Accordion'
					toggle={accordionToggle}
					on={accordionOn}>
					<Row>
						<Button
							position='center'

							type='confirm'
							onClick={() => alert('Click')}
						>confirm</Button>
						<Button
							position='center'

							type='warning'
							onClick={() => alert('Click')}
						>warning</Button>
						<Button
							position='center'

							type='danger'
							onClick={() => alert('Click')}
						>danger</Button>
						<Button
							position='center'

							type='info'
							onClick={() => alert('Click')}
						>info</Button>
						<Button
							position='center'

							type='default'
							onClick={() => alert('Click')}
						>default</Button>
						<Button
							position='center'

							type='light'
							onClick={() => alert('Click')}
						>light</Button>
						<Button
							position='center'

							type='dark'
							onClick={() => alert('Click')}
						>dark</Button>
					</Row>
					<Button
						position='full'

						type='confirm'
						onClick={() => alert('Click')}
					>Full Confirm Button</Button>
					<Button
						position='full'

						type='warning'
						onClick={() => alert('Click')}
					>Full Warning Button</Button>
					<Button
						position='full'

						type='danger'
						onClick={() => alert('Click')}
					>Full Danger Button</Button>
					<Button
						position='full'

						type='info'
						onClick={() => alert('Click')}
					>Full Info Button</Button>
					<Button
						position='full'

						type='default'
						onClick={() => alert('Click')}
					>Full Default Button</Button>
					<Button
						position='full'

						type='light'
						onClick={() => alert('Click')}
					>Full Light Button</Button>
					<Button
						position='full'

						type='dark'
						onClick={() => alert('Click')}
					>Full Dark Button</Button>
				</Accordion>

				<Accordion
					type='confirm'
					block
					buttonTitle='Toggle Form'

					on={formOn}
					toggle={formToggle}>
					<form id='form1' style={{ flex: 1 }} onSubmit={e => {
						e.preventDefault()
						createUser({ variables: { username, email, password } })
						setUsername('')
						setPassword('')
						setEmail('')
					}}>
						<Input
							block

							placeholder='Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)} />

						<Input
							block

							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)} />

						<Input
							block

							type='password'
							placeholder='Senha'
							value={password}
							onChange={(e) => setPassword(e.target.value)} />

						<Button
							position='center'

							type='confirm'
							form='form1'
							value="Submit"
						>Enviar
						</Button>
						<div style={{ flex: 1 }}>
							{
								createUserResponse.error && createUserResponse.error.graphQLErrors[0].messages.map(error =>
									<Card>
										<Text>{error}</Text>
									</Card>
								)
							}
						</div>
					</form >
				</Accordion>

				<Button
					position='full'
					type='info'
					onClick={() => getUsers()}
				>Get Users</Button>
				{
					userLoading ?
						<Text bold isTitle centered>Loading...</Text>
						: userError ?
							<Text>Error</Text>
							:
							userData &&
							<List
								canClick
								click={(item) => console.log('Clicou: ', item)}
								array={userData.readAllUsers}

								titleVarName='username'
								descriptionVarName='email' />
				} */}
			</Container>
		</ThemeContext.Provider>
	)
}

export default App;