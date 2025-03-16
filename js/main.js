// DialogueGenie - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initApp();
});

function initApp() {
    // Set up navigation
    setupNavigation();
    
    // Initialize chat functionality if on chat page
    if (document.querySelector('.chat-container')) {
        initChat();
    }
    
    // Initialize practice page functionality
    if (document.getElementById('start-practice')) {
        initPractice();
    }
    
    // Initialize character selection on home page
    if (document.querySelector('.character-selection')) {
        initCharacterSelection();
    }

    // Initialize progress page interactive elements
    if (document.querySelector('.progress-chart')) {
        initProgressCharts();
    }
}

// Navigation between tabs
function setupNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the tab name from the label
            const tabName = this.querySelector('.tab-label').innerText.toLowerCase();
            
            // Navigate to the appropriate page
            switch(tabName) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'chat':
                    window.location.href = 'chat.html';
                    break;
                case 'practice':
                    window.location.href = 'practice.html';
                    break;
                case 'progress':
                    window.location.href = 'progress.html';
                    break;
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
            }
        });
    });
}

// Chat functionality
function initChat() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = chatInput.nextElementSibling;
    
    // Handle send button click
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
    
    // Handle Enter key press
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initialize scenario selector if it exists
    const scenarioSelector = document.querySelector('.scenario-selector');
    if (scenarioSelector) {
        scenarioSelector.addEventListener('change', function() {
            changeScenario(this.value);
        });
    }

    // Initialize emotion detection
    initEmotionDetection();

    // Initialize real-time feedback
    initRealTimeFeedback();
}

// Character selection functionality
function initCharacterSelection() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            characterCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get character info
            const characterName = this.querySelector('h3').innerText;
            const characterRole = this.querySelector('.character-role').innerText;
            
            // Show selection confirmation
            showToast(`Selected: ${characterName} (${characterRole})`);
            
            // Store selection in localStorage for use in chat
            localStorage.setItem('selectedCharacter', characterName);
            localStorage.setItem('selectedRole', characterRole);
        });
    });

    // Custom character creation
    const createCustomBtn = document.querySelector('.create-character-btn');
    if (createCustomBtn) {
        createCustomBtn.addEventListener('click', function() {
            showCustomCharacterModal();
        });
    }
}

// Practice page functionality
function initPractice() {
    const startPracticeBtn = document.getElementById('start-practice');
    const practiceContent = document.getElementById('practice-content');
    
    startPracticeBtn.addEventListener('click', function() {
        practiceContent.style.display = 'block';
    });
    
    // Back button in practice session
    const backButton = practiceContent.querySelector('.fa-arrow-left').parentElement;
    backButton.addEventListener('click', function() {
        practiceContent.style.display = 'none';
    });

    // Dynamic difficulty adjustment
    initDifficultyAdjustment();

    // Initialize tone and emotion guidance
    initToneGuidance();
}

// Chart initialization on Progress page
function initProgressCharts() {
    // This would typically use a charting library like Chart.js
    // For the prototype, we're using static charts
    console.log('Progress charts initialized');
}

// Send a message in the chat
function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message to chat
        addMessageToChat(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Add AI response after a delay (simulating processing)
        setTimeout(() => {
            // Generate AI response based on context
            const aiResponse = generateAIResponse(message);
            
            // Add AI response to chat
            addMessageToChat(aiResponse, 'ai');
            
            // Show feedback after AI response
            showFeedback(message);
        }, 1000);
    }
}

// Add a message to the chat container
function addMessageToChat(message, sender) {
    const chatContainer = document.querySelector('.chat-container');
    const bubble = document.createElement('div');
    
    bubble.className = sender === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-ai';
    
    // If this is a user message, add emotion analysis
    if (sender === 'user') {
        const emotion = analyzeEmotion(message);
        const emotionIcon = getEmotionIcon(emotion);
        
        // Add emotion indicator
        const emotionIndicator = document.createElement('div');
        emotionIndicator.className = 'emotion-indicator';
        emotionIndicator.innerHTML = `
            <div style="position: absolute; top: -10px; right: -10px; width: 22px; height: 22px; border-radius: 50%; 
                background-color: white; display: flex; align-items: center; justify-content: center; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ${emotionIcon}
            </div>
            <div style="margin-bottom: 5px; font-size: 11px; color: var(--text-secondary);">
                <i class="fas fa-face-smile" style="color: var(--accent-color);"></i> ${emotion} tone
            </div>
        `;
        bubble.appendChild(emotionIndicator);
    }
    
    // Add the message text
    const messageText = document.createElement('span');
    messageText.textContent = message;
    bubble.appendChild(messageText);
    
    // Add to container
    chatContainer.appendChild(bubble);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Generate an AI response based on user input and context
function generateAIResponse(userMessage) {
    // In a real implementation, this would call an AI API
    // For the prototype, we'll return canned responses
    
    const responses = [
        "That's a great point about the marketing strategy. Can you elaborate on how you would measure its success?",
        "I understand your approach. What specific metrics would you use to track performance?",
        "That's an interesting perspective. Have you considered how this would impact our customer demographics?",
        "Your analysis makes sense. How would you prioritize these initiatives given our limited resources?",
        "I see the potential in your idea. What timeline do you envision for implementation?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Analyze emotion in user message
function analyzeEmotion(message) {
    // In a real implementation, this would use NLP or an emotion analysis API
    // For the prototype, we'll do simple keyword matching
    
    message = message.toLowerCase();
    
    if (message.includes('happy') || message.includes('excited') || message.includes('great')) {
        return 'Enthusiastic';
    } else if (message.includes('confused') || message.includes('not sure') || message.includes('don\'t understand')) {
        return 'Confused';
    } else if (message.includes('disagree') || message.includes('not correct') || message.includes('wrong')) {
        return 'Skeptical';
    } else if (message.includes('think') || message.includes('consider') || message.includes('perhaps')) {
        return 'Thoughtful';
    } else {
        return 'Neutral';
    }
}

// Get icon for emotion
function getEmotionIcon(emotion) {
    switch(emotion) {
        case 'Enthusiastic':
            return '<i class="fas fa-grin-beam" style="font-size: 12px; color: #4CAF50;"></i>';
        case 'Confused':
            return '<i class="fas fa-question-circle" style="font-size: 12px; color: #FF9800;"></i>';
        case 'Skeptical':
            return '<i class="fas fa-meh" style="font-size: 12px; color: #F44336;"></i>';
        case 'Thoughtful':
            return '<i class="fas fa-lightbulb" style="font-size: 12px; color: #2196F3;"></i>';
        default:
            return '<i class="fas fa-smile" style="font-size: 12px; color: #607D8B;"></i>';
    }
}

// Show real-time feedback on user's language skills
function showFeedback(message) {
    const feedbackContainer = document.querySelector('.feedback-container');
    if (!feedbackContainer) return;
    
    // Clear previous feedback
    feedbackContainer.innerHTML = '';
    
    // Generate feedback (would be AI-generated in real app)
    const feedbackScore = Math.floor(Math.random() * 15) + 85; // Random score between 85-100
    const pronunciationScore = Math.floor(Math.random() * 20) + 80;
    const grammarScore = Math.floor(Math.random() * 25) + 75;
    const fluencyScore = Math.floor(Math.random() * 20) + 80;
    
    // Identify strengths and areas for improvement
    const strengths = [];
    const improvements = [];
    
    if (pronunciationScore > 90) {
        strengths.push('Clear pronunciation');
    } else {
        improvements.push('Work on pronunciating "-tion" sounds');
    }
    
    if (grammarScore > 85) {
        strengths.push('Good grammar structure');
    } else {
        improvements.push('Review past tense usage');
    }
    
    if (fluencyScore > 85) {
        strengths.push('Natural flow of speech');
    } else {
        improvements.push('Practice speaking at a more natural pace');
    }
    
    // Create feedback HTML
    const feedbackHTML = `
        <div class="feedback-header">
            <h4>Language Feedback</h4>
            <div class="feedback-score">${feedbackScore}/100</div>
        </div>
        <div class="feedback-details">
            <div class="feedback-metric">
                <span>Pronunciation</span>
                <div class="metric-bar">
                    <div class="metric-fill" style="width: ${pronunciationScore}%"></div>
                </div>
                <span>${pronunciationScore}%</span>
            </div>
            <div class="feedback-metric">
                <span>Grammar</span>
                <div class="metric-bar">
                    <div class="metric-fill" style="width: ${grammarScore}%"></div>
                </div>
                <span>${grammarScore}%</span>
            </div>
            <div class="feedback-metric">
                <span>Fluency</span>
                <div class="metric-bar">
                    <div class="metric-fill" style="width: ${fluencyScore}%"></div>
                </div>
                <span>${fluencyScore}%</span>
            </div>
        </div>
        <div class="feedback-analysis">
            <div class="feedback-strengths">
                <h5><i class="fas fa-check-circle"></i> Strengths</h5>
                <ul>
                    ${strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div class="feedback-improvements">
                <h5><i class="fas fa-lightbulb"></i> Focus Areas</h5>
                <ul>
                    ${improvements.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    feedbackContainer.innerHTML = feedbackHTML;
    feedbackContainer.style.display = 'block';
    
    // Animate in
    setTimeout(() => {
        feedbackContainer.classList.add('show');
    }, 100);
}

// Change the current dialogue scenario
function changeScenario(scenarioId) {
    // In a real implementation, this would load a new scenario
    const scenarioTitle = document.querySelector('.scenario-title');
    const scenarioContext = document.querySelector('.scenario-context');
    
    // Example scenarios
    const scenarios = {
        'business': {
            title: 'Business Meeting',
            context: 'You are attending a marketing team meeting to discuss the new product launch strategy.'
        },
        'interview': {
            title: 'Job Interview',
            context: 'You are interviewing for a marketing position at a technology company.'
        },
        'travel': {
            title: 'Airport Navigation',
            context: 'You need to find your gate and check information about your delayed flight.'
        }
    };
    
    if (scenarios[scenarioId]) {
        scenarioTitle.textContent = scenarios[scenarioId].title;
        scenarioContext.textContent = scenarios[scenarioId].context;
        
        // Show toast notification
        showToast(`Scenario changed to: ${scenarios[scenarioId].title}`);
    }
}

// Initialize dynamic difficulty adjustment
function initDifficultyAdjustment() {
    const makeEasierBtn = document.querySelector('.fa-angle-down').parentElement;
    const challengeBtn = document.querySelector('.fa-angle-up').parentElement;
    
    if (makeEasierBtn && challengeBtn) {
        // Make conversation easier
        makeEasierBtn.addEventListener('click', function() {
            adjustDifficulty('easier');
        });
        
        // Make conversation more challenging
        challengeBtn.addEventListener('click', function() {
            adjustDifficulty('harder');
        });
    }
}

// Adjust conversation difficulty
function adjustDifficulty(direction) {
    // In a real implementation, this would modify the AI's responses
    // For the prototype, we'll just show a notification
    
    if (direction === 'easier') {
        showToast('Difficulty decreased: Using simpler vocabulary and grammar');
    } else {
        showToast('Difficulty increased: Using more complex language patterns');
    }
    
    // Update difficulty indicator
    const difficultySlider = document.querySelector('.difficulty-slider');
    if (difficultySlider) {
        const currentPosition = parseFloat(difficultySlider.style.left || '50%');
        const newPosition = direction === 'easier' ? 
            Math.max(currentPosition - 10, 10) + '%' : 
            Math.min(currentPosition + 10, 90) + '%';
        
        difficultySlider.style.left = newPosition;
    }
}

// Initialize tone guidance
function initToneGuidance() {
    const toneSuggestions = document.querySelectorAll('.tone-suggestion');
    
    if (toneSuggestions.length) {
        toneSuggestions.forEach(suggestion => {
            suggestion.addEventListener('click', function() {
                // In a real implementation, this would guide the user's tone
                const tone = this.textContent.trim();
                showToast(`Using ${tone} tone for your response`);
            });
        });
    }
}

// Initialize emotion detection system
function initEmotionDetection() {
    // In a real implementation, this would set up audio analysis
    console.log('Emotion detection initialized');
    
    // Simulate emotion detection with microphone access
    const micButton = document.querySelector('.fa-microphone').parentElement;
    if (micButton) {
        micButton.addEventListener('click', function() {
            toggleMicrophone();
        });
    }
}

// Toggle microphone for voice input
function toggleMicrophone() {
    const micButton = document.querySelector('.fa-microphone').parentElement;
    const isActive = micButton.classList.contains('active');
    
    if (isActive) {
        micButton.classList.remove('active');
        showToast('Voice recognition disabled');
    } else {
        micButton.classList.add('active');
        showToast('Listening... Speak clearly into the microphone');
        
        // In a real implementation, this would start speech recognition
        // For the prototype, we'll simulate after a delay
        setTimeout(() => {
            const chatInput = document.querySelector('.chat-input');
            chatInput.value = 'I think we should focus on social media for our marketing strategy.';
            
            micButton.classList.remove('active');
        }, 3000);
    }
}

// Initialize real-time feedback system
function initRealTimeFeedback() {
    // Set up the feedback container if it doesn't exist
    if (!document.querySelector('.feedback-container')) {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;
        
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'feedback-container';
        feedbackContainer.style.display = 'none';
        
        // Insert before the input area
        const inputContainer = document.querySelector('.input-container');
        chatContainer.parentNode.insertBefore(feedbackContainer, inputContainer);
    }
}

// Show a custom character creation modal
function showCustomCharacterModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Custom Character</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Character Name</label>
                    <input type="text" class="form-input" id="character-name" placeholder="e.g., John Smith">
                </div>
                <div class="form-group">
                    <label>Character Role</label>
                    <input type="text" class="form-input" id="character-role" placeholder="e.g., Financial Advisor">
                </div>
                <div class="form-group">
                    <label>Personality Traits</label>
                    <div class="trait-selectors">
                        <div class="trait-item">
                            <input type="checkbox" id="trait-formal"> 
                            <label for="trait-formal">Formal</label>
                        </div>
                        <div class="trait-item">
                            <input type="checkbox" id="trait-friendly"> 
                            <label for="trait-friendly">Friendly</label>
                        </div>
                        <div class="trait-item">
                            <input type="checkbox" id="trait-detailed"> 
                            <label for="trait-detailed">Detailed</label>
                        </div>
                        <div class="trait-item">
                            <input type="checkbox" id="trait-patient"> 
                            <label for="trait-patient">Patient</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Language Level</label>
                    <select class="form-select" id="language-level">
                        <option value="beginner">Beginner (A1-A2)</option>
                        <option value="intermediate" selected>Intermediate (B1-B2)</option>
                        <option value="advanced">Advanced (C1-C2)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Conversation Topics</label>
                    <textarea class="form-textarea" id="conversation-topics" 
                        placeholder="List topics this character should be knowledgeable about..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="button button-secondary modal-cancel">Cancel</button>
                <button class="button button-primary modal-save">Create Character</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-save').addEventListener('click', () => {
        const name = document.getElementById('character-name').value.trim();
        const role = document.getElementById('character-role').value.trim();
        
        if (name && role) {
            // In a real implementation, this would save the character
            showToast(`Custom character "${name}" created!`);
            document.body.removeChild(modal);
            
            // Add the custom character to the selection
            addCustomCharacterToSelection(name, role);
        } else {
            showToast('Please provide both name and role for your character');
        }
    });
}

// Add a custom character to the selection grid
function addCustomCharacterToSelection(name, role) {
    const characterGrid = document.querySelector('.character-grid');
    if (!characterGrid) return;
    
    const customCharacter = document.createElement('div');
    customCharacter.className = 'character-card';
    customCharacter.innerHTML = `
        <div class="character-avatar custom-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <h3>${name}</h3>
        <div class="character-role">${role}</div>
        <div class="character-tag custom-tag">Custom</div>
    `;
    
    // Add event listener
    customCharacter.addEventListener('click', function() {
        // Remove selected class from all cards
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to this card
        this.classList.add('selected');
        
        // Show selection confirmation
        showToast(`Selected: ${name} (${role})`);
        
        // Store selection
        localStorage.setItem('selectedCharacter', name);
        localStorage.setItem('selectedRole', role);
    });
    
    // Insert before the "Create Custom" card
    const createCustomCard = document.querySelector('.create-character-card');
    characterGrid.insertBefore(customCharacter, createCustomCard);
}

// Show a toast notification
function showToast(message) {
    // Create toast if it doesn't exist
    if (!document.querySelector('.toast')) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
