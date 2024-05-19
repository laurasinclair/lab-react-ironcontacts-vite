import { useState } from 'react'
import './App.css'
import contactsJSON from './contacts.json'

function App() {
	const [contacts, setContacts] = useState([contactsJSON[0], contactsJSON[1], contactsJSON[2], contactsJSON[3], contactsJSON[4]])
	const [contactsMessage, setContactsMessage] = useState('Add Random Contact')

	const handleAddContact = () => {
		const newContactToAdd = contactsJSON[Math.round(Math.random() * contactsJSON.length)]

		if (!contacts.some((contact) => contact.id === newContactToAdd.id)) {
			setContacts([newContactToAdd, ...contacts])
		} else {
			setContactsMessage('All contacts are here')
		}
	}

	const handleSortByName = (e) => {
		e.preventDefault()

		const sortedContacts = [...contacts].sort((a, b) => {
			const nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase()

			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}

			return 0
		})

		setContacts(sortedContacts)
	}

	const handleDelete = (contactId) => {
		const updatedContacts = contacts.filter((contact) => contact.id !== contactId)

		setContacts(updatedContacts)
	}

	const handleSortByPopularity = (e) => {
		e.preventDefault()

		const sortedContacts = [...contacts].sort((a, b) => {
			if (a.popularity < b.popularity) {
				return 1
			}
			if (a.popularity > b.popularity) {
				return -1
			}

			return 0
		})

		setContacts(sortedContacts)
	}

	return (
		<div className="App">
			<h3>LAB | React IronContacts</h3>

			<div className="buttons">
				<button onClick={handleAddContact}>{contactsMessage}</button>

				<button onClick={handleSortByName}>Sort by name</button>

				<button onClick={handleSortByPopularity}>Sort by popularity</button>
			</div>

			<table className="contacts">
				<tbody>
					{contacts &&
						contacts.length > 0 &&
						contacts.map((contact) => {
							return (
								<tr key={contact.id}>
									<td className="contacts_picture">
										<img src={contact.pictureUrl} alt={contact.name} className="contact-pic" />
									</td>
									<td className="contacts_name">{contact.name}</td>
									<td className="contacts_popularity">{Math.floor(contact.popularity * 100) / 100}</td>
									<td className="contacts_wonOscar">{contact.wonOscar && '🏆'}</td>
									<td className="contacts_wonEmmy">{contact.wonEmmy && '🌟'}</td>
									<td className="contacts_deleteBtn">
										<button onClick={() => handleDelete(contact.id)}>Delete</button>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default App
