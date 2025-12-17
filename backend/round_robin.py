import collections

class Process:
    def __init__(self, pid, arrival_time, burst_time):
        self.pid = pid
        self.arrival_time = arrival_time
        self.burst_time = burst_time
        self.remaining_time = burst_time
        self.completion_time = 0
        self.turnaround_time = 0
        self.waiting_time = 0

    def __repr__(self):
        return f"Process(pid={self.pid}, arrival={self.arrival_time}, burst={self.burst_time})"

def round_robin_scheduler(processes, time_quantum):
    """
    Simulates Round Robin scheduling.
    
    Args:
        processes: List of Process objects.
        time_quantum: Integer time slice.
        
    Returns:
        List of completed Process objects with calculated metrics.
        List of strings representing the execution log.
    """
    # Sort by arrival time primarily
    processes.sort(key=lambda x: x.arrival_time)
    
    # Queue for ready processes
    ready_queue = collections.deque()
    
    current_time = 0
    completed_processes = []
    execution_log = [] # To store the Gantt chart history
    timeline_data = [] # Structured data for UI plotting: (start, end, pid)
    
    # Keep track of which processes have been added to the ready queue
    added_to_queue = {p.pid: False for p in processes}
    
    # Add initial processes that have arrived at time 0 (or strictly before/at current_time)
    # Since we start at 0, check arrival <= 0
    processes_left_to_add = len(processes)
    
    # Helper to add arrived processes
    def add_arrived_processes(current_time):
        added_count = 0
        for p in processes:
            if p.arrival_time <= current_time and not added_to_queue[p.pid]:
                ready_queue.append(p)
                added_to_queue[p.pid] = True
                added_count += 1
        return added_count

    add_arrived_processes(0)
    
    while len(completed_processes) < len(processes):
        # If queue empty but processes remain, jump time to next arrival
        if not ready_queue:
            # Find next arriving process
            next_arrival = float('inf')
            for p in processes:
                if not added_to_queue[p.pid]:
                    next_arrival = min(next_arrival, p.arrival_time)
            
            if next_arrival == float('inf'):
                break # Should not happen if logic is correct
                
            current_time = next_arrival
            add_arrived_processes(current_time)
            continue

        # Get process from front of queue
        current_process = ready_queue.popleft()
        
        # Execute
        run_time = min(time_quantum, current_process.remaining_time)
        
        # Log execution
        start_exec = current_time
        current_time += run_time
        current_process.remaining_time -= run_time
        
        execution_log.append(f"Time {start_exec:3d} - {current_time:3d}: Process {current_process.pid} runs")
        timeline_data.append({"pid": current_process.pid, "start": start_exec, "end": current_time})

        # IMPORTANT: Check for new arrivals BEFORE re-adding current process
        # Standard RR rule: newly arrived processes go to queue, then the preempted one goes to back.
        add_arrived_processes(current_time)
        
        if current_process.remaining_time > 0:
            # Process not finished, put back in queue
            ready_queue.append(current_process)
        else:
            # Process finished
            current_process.completion_time = current_time
            current_process.turnaround_time = current_process.completion_time - current_process.arrival_time
            current_process.waiting_time = current_process.turnaround_time - current_process.burst_time
            completed_processes.append(current_process)
            execution_log.append(f"Time {current_time:3d}       : Process {current_process.pid} FINISHED")

    return completed_processes, execution_log, timeline_data

def print_results(completed_processes, log):
    print("\n--- Execution Log (Gantt Chart) ---")
    for entry in log:
        print(entry)
        
    print("\n--- Final Metrics ---")
    print(f"{'PID':<5} {'Arrival':<10} {'Burst':<10} {'Completion':<12} {'Turnaround':<12} {'Waiting':<10}")
    
    total_tat = 0
    total_wt = 0
    
    # Sort for cleaner output
    completed_processes.sort(key=lambda x: x.pid)
    
    for p in completed_processes:
        print(f"{p.pid:<5} {p.arrival_time:<10} {p.burst_time:<10} {p.completion_time:<12} {p.turnaround_time:<12} {p.waiting_time:<10}")
        total_tat += p.turnaround_time
        total_wt += p.waiting_time
        
    avg_tat = total_tat / len(completed_processes)
    avg_wt = total_wt / len(completed_processes)
    
    print(f"\nAverage Turnaround Time: {avg_tat:.2f}")
    print(f"Average Waiting Time:    {avg_wt:.2f}")

if __name__ == "__main__":
    # Example Dataset (Mix of arrival times to test robustness)
    # P1: Arrival 0, Burst 10
    # P2: Arrival 1, Burst 4
    # P3: Arrival 2, Burst 5
    # P4: Arrival 3, Burst 3
    
    input_processes = [
        Process(pid="P1", arrival_time=0, burst_time=10),
        Process(pid="P2", arrival_time=1, burst_time=4),
        Process(pid="P3", arrival_time=2, burst_time=5),
        Process(pid="P4", arrival_time=3, burst_time=3)
    ]
    
    quantum = 2
    
    print(f"Starting Round Robin Scheduler with Time Quantum = {quantum}")
    finished_processes, log, _ = round_robin_scheduler(input_processes, quantum)
    print_results(finished_processes, log)
