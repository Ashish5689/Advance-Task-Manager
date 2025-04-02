import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { TaskFilter } from '../types';
import AppIcon from './AppIcon';

const Container = styled.div<{ theme: any }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  font-family: 'Inter', 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledAppIcon = styled(AppIcon)`
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ThemeToggle = styled.button<{ theme: any; isDark: boolean }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme, isDark }) => isDark ? '#2c3e50' : '#f1c40f'};
  color: ${({ isDark }) => isDark ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const Input = styled.input<{ theme: any }>`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}33`};
  }
`;

const Button = styled.button<{ theme: any; primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme, primary }) => primary ? theme.primary : theme.secondary};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean; theme: any }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  border: 1px solid ${({ active, theme }) => active ? theme.primary : theme.border};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.primary : theme.hover};
  }
`;

const TaskListContainer = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
  background-color: ${({ theme }) => `${theme.hover}50`};
  border-radius: 12px;
  margin-top: 2rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const TaskItem = styled.li<{ isDragging?: boolean; theme: any; completed?: boolean; className?: string }>`
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  margin-bottom: 0.8rem;
  background-color: ${({ theme, isDragging, completed }) => 
    isDragging ? theme.hover : completed ? `${theme.hover}50` : theme.background};
  border: 1px solid ${({ theme, isDragging }) => isDragging ? theme.primary : theme.border};
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: ${({ theme, isDragging }) => 
    isDragging 
      ? `0 8px 16px ${theme.shadow}` 
      : `0 2px 4px ${theme.shadow}`};
  ${({ className }) => className === 'deleting' && 'opacity: 0.5;'}
  cursor: grab;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}80;
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const DragHandle = styled.div`
  width: 12px;
  height: 20px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: grab;
  opacity: 0.5;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
  
  &::before, &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 2px;
    box-shadow: 0 6px 0 ${({ theme }) => theme.secondary}, 0 12px 0 ${({ theme }) => theme.secondary};
  }
  
  &::after {
    display: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
  position: relative;
  outline: none;
  transition: all 0.2s;
  
  &:checked {
    background-color: ${({ theme }) => theme.primary};
  }
  
  &:checked::after {
    content: '✓';
    font-size: 14px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TaskTitle = styled.span<{ completed?: boolean; theme: any }>`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ theme, completed }) => completed ? theme.secondary : theme.text};
  font-size: 1rem;
  transition: all 0.2s;
  word-break: break-word;
`;

const TaskDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  margin-right: 1rem;

  @media (max-width: 576px) {
    display: none;
  }
`;

const DeleteButton = styled.button<{ theme: any }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background-color: #ff5b5b20;
    color: #ff5b5b;
  }
`;

const TaskActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Helper function to format date
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TaskManager: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const {
    filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    reorderTasks,
  } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    // Get the indices from the result
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    // Only reorder if the positions changed
    if (sourceIndex !== destinationIndex) {
      reorderTasks(sourceIndex, destinationIndex);
    }
  };

  const handleDeleteTask = (id: string) => {
    setDeletingTaskId(id);
    setTimeout(() => {
      deleteTask(id);
      setDeletingTaskId(null);
    }, 300); // Match this with the CSS animation duration
  };

  return (
    <Container theme={theme}>
      <ContentWrapper>
        <Header theme={theme}>
          <TitleContainer>
            <StyledAppIcon size={36} theme={theme} />
            <Title theme={theme}>Task Manager</Title>
          </TitleContainer>
          <ThemeToggle 
            onClick={toggleTheme} 
            theme={theme} 
            isDark={isDarkMode}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </ThemeToggle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            theme={theme}
          />
          <Button type="submit" theme={theme} primary>
            Add Task
          </Button>
        </Form>

        <FilterContainer>
          {(['all', 'completed', 'pending'] as TaskFilter[]).map((filterType) => (
            <FilterButton
              key={filterType}
              onClick={() => setFilter(filterType)}
              active={filter === filterType}
              theme={theme}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>

        <TaskListContainer>
          {filteredTasks.length === 0 ? (
            <EmptyState theme={theme}>
              {filter === 'all' 
                ? 'No tasks yet. Add your first task!' 
                : filter === 'completed'
                  ? 'No completed tasks yet.' 
                  : 'No pending tasks.'}
            </EmptyState>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            theme={theme}
                            completed={task.completed}
                            className={deletingTaskId === task.id ? 'deleting' : ''}
                          >
                            <DragHandle 
                              {...provided.dragHandleProps}
                              theme={theme}
                            />
                            <CheckboxContainer>
                              <StyledCheckbox
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                theme={theme}
                              />
                            </CheckboxContainer>
                            <TaskTitle completed={task.completed} theme={theme}>
                              {task.title}
                            </TaskTitle>
                            <TaskActionsContainer>
                              <TaskDate theme={theme}>
                                {formatDate(task.createdAt)}
                              </TaskDate>
                              <DeleteButton
                                onClick={() => handleDeleteTask(task.id)}
                                theme={theme}
                                aria-label="Delete task"
                              >
                                ✖
                              </DeleteButton>
                            </TaskActionsContainer>
                          </TaskItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </TaskListContainer>
      </ContentWrapper>
    </Container>
  );
};

export default TaskManager; 