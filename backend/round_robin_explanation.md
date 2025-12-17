# Round Robin Scheduling Algorithm

## Overview
Round Robin (RR) is a CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way. It is designed to give every process a fair share of CPU time.

## How it Works
1. **Time Quantum**: A small unit of time (e.g., 2ms) called a time quantum or time slice is defined.
2. **Ready Queue**: All ready processes are kept in a FIFO (First-In-First-Out) queue.
3. **Execution**:
    - The CPU scheduler picks the first process from the ready queue.
    - It sets a timer to interrupt after one time quantum.
    - If the process finishes before the time quantum expires, it leaves the CPU voluntarily.
    - If the time quantum expires and the process is still running, it is preempted and added to the back of the ready queue.

## Key Metrics
- **Arrival Time**: When the process enters the system.
- **Burst Time**: Total CPU time required by the process.
- **Completion Time**: When the process finishes execution.
- **Turnaround Time**: Completion Time - Arrival Time.
- **Waiting Time**: Turnaround Time - Burst Time.

## Advantages
- Fair allocation of CPU.
- No starvation (every process gets a chance).
- Useful for time-sharing systems.

## Disadvantages
- High context switching overhead if time quantum is too small.
- Response time can be poor if time quantum is too large (behaves like FCFS).
