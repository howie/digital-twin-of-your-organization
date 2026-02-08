from pydantic import BaseModel


class Soul(BaseModel):
    content: str


class Memory(BaseModel):
    content: str


class Values(BaseModel):
    content: str


class Goal(BaseModel):
    content: str


class Agent(BaseModel):
    id: str
    name: str
    soul: Soul
    memory: Memory
    values: Values
    goal: Goal
