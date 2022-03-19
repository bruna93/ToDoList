import { useState } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const sectionStyle = {
		background: "var(--shapes)",
		borderRadius: "1rem",

		margin: "-10rem auto auto auto",
		padding: "70px 60px",

		filter: "drop-shadow(0px 24px 64px rgba(0, 0, 0, 0.06))",

		maxWidth: "70rem",
	};

	const headerStyle = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		"h2": {
			color: "var(--text-title)",
			fontSize: "2.25rem",
		},

		".input-group": {
			display: "flex",
			gap: "0.25rem",
			alignItems: "center",

			background: "#fff",
			fontSize: "16px",

			"input": {
				flex: "1",
				background: "var(--background)",
				border: "0",
				color: "var(--text)",
				padding: "12px 24px",

				borderRadius: "8px",

				"&::placeholder": {
					color: "var(--text-light)",
				}
			},

			"button": {
				fontWeight: "600",
				borderRadius: "8px",
				border: "0",
				background: "var(--green)",
				color: "#fff",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",

				padding: "14px",
				transition: "filter 0.2s",

				"&:hover": {
					filter: "brightness(0.95)",
				}
			}
		}
	};

	const mainStyle = {
		marginTop: "3rem",

		"ul": {
			listStyle: "none",

			"li": {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				borderBottom: "1px solid #EBEBEB",
				padding: "1rem 0",

				"div": {
					display: "flex",
					alignItems: "center",
					gap: "14px",
					outline: "0",

					"p": {
						fontSize: "1rem",
						color: "var(--text)",
					},

					"&.completed": {
						"p": {
							textDecoration: "line-through",
							opacity: "0.6",
						}
					},

					".checkbox-container": {
						display: "block",
						position: "relative",
						paddingLeft: "14px",
						marginBottom: "18px",

						"input": {
							position: "absolute",
							opacity: "0",
							cursor: "pointer",
							height: "0",
							width: "0",

							"&:checked": {
								"& ~ .checkmark": {
									backgroundColor: "var(--violet)",
								},

								"& ~ .checkmark:after": {
									display: "block",
								}
							}
						},

						".checkmark": {
							position: "absolute",
							top: "0",
							left: "0",
							width: "16px",
							height: "16px",
							backgroundColor: "var(--background)",
							borderRadius: "2px",

							"&:after": {
								content: `""`,
								position: "absolute",
								display: "none",
								left: "6px",
								top: "3px",
								width: "3px",
								height: "6px",
								border: "solid white",
								borderWidth: "0 2px 2px 0",
								transform: "rotate(45deg)",
							}
						}
					}
				},

				"button": {
					background: "transparent",
					border: "0",

					"svg": {
						color: "var(--red)",
					},

					"&:hover": {
						"svg": {
							filter: "brightness(0.5)",
						}
					}
				}
			}
		}
	};

	function handleCreateNewTask() {
		if (newTaskTitle == "") {
			return;
		}
		const newTask = {
			id: Math.random(),
			title: newTaskTitle,
			isComplete: false
		}
		setTasks(oldState => [...oldState, newTask]);
		setNewTaskTitle("");
	}

	function handleToggleTaskCompletion(id: number) {
		const newTasks = tasks.map(task => task.id === id ? {
			...task,
			isComplete: !task.isComplete
		} : task);
		setTasks(newTasks);
	}

	function handleRemoveTask(id: number) {
		const filteredTasks = tasks.filter(task => task.id !== id);
		setTasks(filteredTasks);
	}

	return (
		<Box component="section" sx={sectionStyle}>
			<Box component="header" sx={headerStyle}>
				<h2>Minhas tasks</h2>

				<Box className="input-group">
					<input
						type="text"
						placeholder="Adicionar novo todo"
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<Button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff" />
					</Button>
				</Box>
			</Box>

			<Box component="main" sx={mainStyle}>
				<List>
					{tasks.map(task => (
						<ListItem key={task.id}>
							<Box className={task.isComplete ? 'completed' : ''} data-testid="task" >
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() => handleToggleTaskCompletion(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</Box>

							<Button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
								<FiTrash size={16} />
							</Button>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	)
}
