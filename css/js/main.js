// DialogueGenie - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initChat();
    initPractice();
    initProgress();
    initHome();
    initProfile();
    initSettings();
    initTabNavigation();
});

/**
 * Initialize chat functionality
 */
function initChat() {
    // Chat screen elements
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatContainer = document.querySelector('.chat-container');
    
    if (!chatInput || !sendButton) return; // Exit if not on chat page
    
    // Send message when button is clicked
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
    
    // Send message when Enter key is pressed
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI response (in a real app, this would call an API)
        setTimeout(function() {
            const responses = [
                "That's a great point. Could you tell me more about that?",
                "I understand what you're saying. Have you considered an alternative approach?",
                "That's interesting! Let's explore that idea further.",
                "I see what you mean. How would you address the challenges that might arise?",
                "That's a good perspective. In this context, I'd also consider the implications for other stakeholders."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai');
            
            // Show feedback after AI response (simulation)
            showFeedback();
        }, 1000);
    }
    
    // Function to add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-bubble');
        
        if (sender === 'user') {
            messageDiv.classList.add('chat-bubble-user');
        } else {
            messageDiv.classList.add('chat-bubble-ai');
        }
        
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to show feedback (simulation)
    function showFeedback() {
        const feedbackContainer = document.querySelector('.feedback-container');
        if (!feedbackContainer) return;
        
        feedbackContainer.classList.add('show');
    }
    
    // Initialize microphone button
    const micButton = document.querySelector('.mic-button');
    if (micButton) {
        micButton.addEventListener('click', function() {
            this.classList.toggle('active');
            // In a real implementation, this would start/stop speech recognition
            showToast('Voice recognition ' + (this.classList.contains('active') ? 'activated' : 'deactivated'));
        });
    }
}

/**
 * Initialize practice session functionality
 */
function initPractice() {
    // Practice page elements
    const startPracticeBtn = document.getElementById('start-practice');
    const practiceContent = document.getElementById('practice-content');
    
    if (!startPracticeBtn || !practiceContent) return; // Exit if not on practice page
    
    // Start practice session when button is clicked
    startPracticeBtn.addEventListener('click', function() {
        // Show practice session overlay
        practiceContent.style.display = 'block';
        
        // In a real implementation, this would load the appropriate practice scenario
        showToast('Loading practice session...');
    });
    
    // Back button in practice session
    const backButton = practiceContent.querySelector('.practice-back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Hide practice session overlay
            practiceContent.style.display = 'none';
            
            // In a real implementation, this would save progress
            showToast('Progress saved');
        });
    }
    
    // Difficulty adjustment buttons
    const makeEasierBtn = document.querySelector('.make-easier-btn');
    const challengeBtn = document.querySelector('.challenge-btn');
    const difficultySlider = document.querySelector('.difficulty-slider');
    
    if (makeEasierBtn && challengeBtn && difficultySlider) {
        // Current position (percentage)
        let position = 50;
        
        makeEasierBtn.addEventListener('click', function() {
            position = Math.max(position - 10, 0);
            updateDifficulty(position);
            showToast('Difficulty decreased');
        });
        
        challengeBtn.addEventListener('click', function() {
            position = Math.min(position + 10, 100);
            updateDifficulty(position);
            showToast('Difficulty increased');
        });
        
        function updateDifficulty(percent) {
            difficultySlider.style.left = percent + '%';
            
            // In a real implementation, this would adjust the AI's language complexity
            // For now, we'll just show a toast notification
            if (percent < 30) {
                showToast('Difficulty set to: Beginner');
            } else if (percent < 70) {
                showToast('Difficulty set to: Intermediate');
            } else {
                showToast('Difficulty set to: Advanced');
            }
        }
    }
    
    // Handle suggestion chips
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const practiceInput = practiceContent.querySelector('.chat-input');
    
    if (suggestionChips.length && practiceInput) {
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                practiceInput.value = this.textContent;
                practiceInput.focus();
            });
        });
    }
    
    // Initialize practice microphone button
    const practiceMicButton = practiceContent.querySelector('.mic-button');
    const practiceSendButton = practiceContent.querySelector('.send-button');
    
    if (practiceMicButton) {
        practiceMicButton.addEventListener('click', function() {
            this.classList.toggle('active');
            // In a real implementation, this would start/stop speech recognition
            showToast('Voice recognition ' + (this.classList.contains('active') ? 'activated' : 'deactivated'));
        });
    }
    
    // Initialize practice send button
    if (practiceSendButton && practiceInput) {
        practiceSendButton.addEventListener('click', function() {
            sendPracticeMessage();
        });
        
        practiceInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendPracticeMessage();
            }
        });
        
        function sendPracticeMessage() {
            const message = practiceInput.value.trim();
            if (message === '') return;
            
            // Add message to practice chat
            addPracticeMessage(message, 'user');
            
            // Clear input
            practiceInput.value = '';
            
            // Simulate AI response in practice scenario
            setTimeout(function() {
                const responses = [
                    "That's a good point about social media marketing. Which platforms do you think would be most effective for our target demographic?",
                    "I like your strategy. How would you measure the ROI for these marketing initiatives?",
                    "Could you elaborate more on the influencer partnerships? How would you select the right influencers for our brand?",
                    "What timeline are you proposing for this marketing campaign?",
                    "How does this strategy align with our overall brand positioning?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addPracticeMessage(randomResponse, 'ai');
                
                // Show feedback after delay
                setTimeout(showPracticeFeedback, 500);
            }, 1000);
        }
    }
    
    // Function to add message to practice chat
    function addPracticeMessage(text, sender) {
        const practiceChat = practiceContent.querySelector('.practice-chat-container');
        if (!practiceChat) return;
        
        // Emotion icons for messages
        const emotions = {
            user: ['Thoughtful', 'Confident', 'Curious', 'Professional', 'Enthusiastic'],
            ai: ['Encouraging', 'Curious', 'Analytical', 'Supportive', 'Challenging']
        };
        
        // Get random emotion for the message type
        const emotion = emotions[sender][Math.floor(Math.random() * emotions[sender].length)];
        const emotionIcon = getEmotionIcon(emotion);
        
        let messageHTML = '';
        
        if (sender === 'user') {
            messageHTML = `
                <div style="display: flex; flex-direction: row-reverse; margin-bottom: 20px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-left: 10px;">
                        <i class="fas fa-user"></i>
                    </div>
                    <div style="flex: 1;">
                        <div class="tone-indicator" style="text-align: right;"><i class="${emotionIcon}"></i> ${emotion}</div>
                        <div class="chat-bubble chat-bubble-user" style="position: relative;">
                            <div class="emotion-icon">
                                <i class="${emotionIcon}"></i>
                            </div>
                            <p>${text}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            messageHTML = `
                <div style="display: flex; margin-bottom: 20px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div style="flex: 1;">
                        <div class="tone-indicator"><i class="${emotionIcon}"></i> ${emotion}</div>
                        <div class="chat-bubble chat-bubble-ai" style="position: relative;">
                            <div class="emotion-icon">
                                <i class="${emotionIcon}"></i>
                            </div>
                            <p>${text}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Add to chat
        practiceChat.insertAdjacentHTML('beforeend', messageHTML);
        
        // Scroll to bottom
        practiceChat.scrollTop = practiceChat.scrollHeight;
    }
    
    // Function to get appropriate icon for emotion
    function getEmotionIcon(emotion) {
        const iconMap = {
            'Thoughtful': 'fas fa-brain',
            'Confident': 'fas fa-check-circle',
            'Curious': 'fas fa-question-circle',
            'Professional': 'fas fa-user-tie',
            'Enthusiastic': 'fas fa-star',
            'Encouraging': 'fas fa-lightbulb',
            'Analytical': 'fas fa-chart-line',
            'Supportive': 'fas fa-hands-helping',
            'Challenging': 'fas fa-bolt'
        };
        
        return iconMap[emotion] || 'fas fa-comment';
    }
    
    // Function to show practice feedback
    function showPracticeFeedback() {
        // Generate random scores for demonstration
        const grammarScore = Math.floor(Math.random() * 15) + 85; // 85-99
        const pronunciationScore = Math.floor(Math.random() * 20) + 80; // 80-99
        const fluencyScore = Math.floor(Math.random() * 20) + 80; // 80-99
        const vocabularyScore = Math.floor(Math.random() * 15) + 85; // 85-99
        
        // Calculate overall score (weighted)
        const overallScore = Math.floor(
            (grammarScore * 0.25) + 
            (pronunciationScore * 0.30) + 
            (fluencyScore * 0.25) + 
            (vocabularyScore * 0.20)
        );
        
        // Strengths and suggestions (random selection)
        const strengths = [
            'Good use of business vocabulary',
            'Clear presentation of ideas',
            'Effective sentence structure',
            'Appropriate tone for the context',
            'Good rhythm and intonation'
        ];
        
        const suggestions = [
            'Try using more specific examples',
            'Work on clearer pronunciation of certain words',
            'Consider using more complex sentence structures',
            'Include more data to support your claims',
            'Speak a bit more slowly for better clarity'
        ];
        
        // Select 2 random strengths and suggestions
        const selectedStrengths = selectRandomItems(strengths, 2);
        const selectedSuggestions = selectRandomItems(suggestions, 2);
        
        // Build HTML for feedback
        const feedbackHTML = `
            <div class="feedback-container show">
                <div class="feedback-header">
                    <h4>Real-time Feedback</h4>
                    <div class="feedback-score">${overallScore}/100</div>
                </div>
                
                <div class="feedback-details">
                    <div class="feedback-metric">
                        <span>Grammar</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${grammarScore}%"></div>
                        </div>
                        <span>${grammarScore}%</span>
                    </div>
                    
                    <div class="feedback-metric">
                        <span>Pronunciation</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${pronunciationScore}%"></div>
                        </div>
                        <span>${pronunciationScore}%</span>
                    </div>
                    
                    <div class="feedback-metric">
                        <span>Fluency</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${fluencyScore}%"></div>
                        </div>
                        <span>${fluencyScore}%</span>
                    </div>
                    
                    <div class="feedback-metric">
                        <span>Vocabulary</span>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${vocabularyScore}%"></div>
                        </div>
                        <span>${vocabularyScore}%</span>
                    </div>
                </div>
                
                <div class="feedback-analysis">
                    <div class="feedback-strengths">
                        <h5><i class="fas fa-check-circle" style="color: var(--success-color);"></i> Strengths</h5>
                        <ul>
                            ${selectedStrengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="feedback-improvements">
                        <h5><i class="fas fa-arrow-circle-up" style="color: var(--primary-color);"></i> Suggestions</h5>
                        <ul>
                            ${selectedSuggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add feedback to practice chat
        const practiceChat = practiceContent.querySelector('.practice-chat-container');
        if (practiceChat) {
            practiceChat.insertAdjacentHTML('beforeend', feedbackHTML);
            practiceChat.scrollTop = practiceChat.scrollHeight;
        }
    }
    
    // Helper function to select random items from array
    function selectRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

/**
 * Initialize progress tracking functionality
 */
function initProgress() {
    // Progress chart elements
    const progressCharts = document.querySelectorAll('.progress-chart');
    
    if (!progressCharts.length) return; // Exit if not on progress page
    
    // In a real implementation, this would initialize charts and visualizations
    // For this prototype, we'll just add a placeholder message
    
    // AI Insights toggle
    const insightsToggle = document.querySelector('.insights-toggle');
    if (insightsToggle) {
        insightsToggle.addEventListener('click', function() {
            const insightsContent = document.querySelector('.insights-content');
            if (insightsContent) {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                insightsContent.style.display = isExpanded ? 'none' : 'block';
                this.querySelector('i').className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            }
        });
    }
}

/**
 * Initialize home page functionality
 */
function initHome() {
    console.log('Initializing home page...');
    
    // Handle character card selection
    const characterCards = document.querySelectorAll('.home-page div[style*="width: 100px; text-align: center"]');
    characterCards.forEach(card => {
        if (card.id !== 'create-character-card') {
            card.addEventListener('click', function() {
                // Handle character selection
                characterCards.forEach(c => {
                    const imgElement = c.querySelector('div[style*="width: 80px; height: 80px"]');
                    if (imgElement) {
                        imgElement.style.border = 'none';
                    }
                });
                
                const imgContainer = this.querySelector('div[style*="width: 80px; height: 80px"]');
                if (imgContainer) {
                    imgContainer.style.border = '2px solid var(--primary-color)';
                }
                
                // Show selection notification
                const characterName = this.querySelector('div[style*="font-size: 13px"]').textContent;
                showToast(`Selected: ${characterName}`);
            });
        }
    });
    
    // Handle create new character
    const createCharacterCard = document.getElementById('create-character-card');
    if (createCharacterCard) {
        createCharacterCard.addEventListener('click', function() {
            // Show character creation modal
            showCharacterCreationModal();
        });
    }
    
    // Handle scenario selection
    const scenarioCards = document.querySelectorAll('.home-page .scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Handle scenario selection
            scenarioCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show selection notification
            const scenarioName = this.querySelector('h3').textContent;
            showToast(`Selected scenario: ${scenarioName}`);
        });
    });
}

/**
 * Show enhanced character creation modal with comprehensive personalization options
 */
function showCharacterCreationModal() {
    const modalContent = `
        <div class="form-group">
            <label for="character-name">Character Name</label>
            <input type="text" id="character-name" class="form-input" placeholder="e.g., Business Mentor, Travel Expert">
        </div>
        
        <div class="form-group">
            <label>Professional Field</label>
            <div class="trait-selectors" style="display: flex; flex-wrap: wrap; gap: 8px;">
                <div class="field-pill">
                    <input type="radio" name="field" id="field-business" checked> 
                    <label for="field-business">Business</label>
                </div>
                <div class="field-pill">
                    <input type="radio" name="field" id="field-travel"> 
                    <label for="field-travel">Travel</label>
                </div>
                <div class="field-pill">
                    <input type="radio" name="field" id="field-academic"> 
                    <label for="field-academic">Academic</label>
                </div>
                <div class="field-pill">
                    <input type="radio" name="field" id="field-casual"> 
                    <label for="field-casual">Casual</label>
                </div>
                <div class="field-pill">
                    <input type="radio" name="field" id="field-other"> 
                    <label for="field-other">Other</label>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="character-description">Brief Description</label>
            <textarea id="character-description" class="form-textarea" placeholder="Describe your partner's background, expertise, and how they can help you practice English..."></textarea>
        </div>
        
        <div class="form-group">
            <label>Personality Traits</label>
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">Select traits that will shape how your dialogue partner interacts with you</p>
            <div class="trait-selectors">
                <div class="trait-item">
                    <input type="checkbox" id="trait-friendly" checked> 
                    <label for="trait-friendly">Friendly</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-professional"> 
                    <label for="trait-professional">Professional</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-patient" checked> 
                    <label for="trait-patient">Patient</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-humorous"> 
                    <label for="trait-humorous">Humorous</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-supportive" checked> 
                    <label for="trait-supportive">Supportive</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-challenging"> 
                    <label for="trait-challenging">Challenging</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-encouraging"> 
                    <label for="trait-encouraging">Encouraging</label>
                </div>
                <div class="trait-item">
                    <input type="checkbox" id="trait-analytical"> 
                    <label for="trait-analytical">Analytical</label>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Language Level</label>
            <div style="display: flex; flex-direction: column; gap: 5px;">
                <div>
                    <label for="language-level" class="progress-label">Select the language complexity level for this partner</label>
                    <select id="language-level" class="form-select">
                        <option value="beginner">Beginner (A1-A2)</option>
                        <option value="intermediate" selected>Intermediate (B1-B2)</option>
                        <option value="advanced">Advanced (C1-C2)</option>
                        <option value="adaptive">Adaptive (Adjusts to your level)</option>
                    </select>
                </div>
                
                <div style="margin-top: 10px;">
                    <label class="progress-label">Speed of speech</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 12px;">Slower</span>
                        <input type="range" min="1" max="5" value="3" id="speech-speed" class="speech-speed-slider">
                        <span style="font-size: 12px;">Faster</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Appearance</label>
            <div class="avatar-selector">
                <div class="avatar-option">
                    <div class="avatar-circle selected">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Avatar 1">
                    </div>
                </div>
                <div class="avatar-option">
                    <div class="avatar-circle">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Avatar 2">
                    </div>
                </div>
                <div class="avatar-option">
                    <div class="avatar-circle">
                        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Avatar 3">
                    </div>
                </div>
                <div class="avatar-option">
                    <div class="avatar-circle">
                        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Avatar 4">
                    </div>
                </div>
                <div class="avatar-option">
                    <div class="avatar-circle" style="background-color: #f0f4ff; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-plus" style="color: var(--primary-color); font-size: 20px;"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Conversation Topics</label>
            <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">Select topics this partner should be knowledgeable about</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <div class="topic-pill">
                    <input type="checkbox" id="topic-business"> 
                    <label for="topic-business">Business & Marketing</label>
                </div>
                <div class="topic-pill">
                    <input type="checkbox" id="topic-travel"> 
                    <label for="topic-travel">Travel & Culture</label>
                </div>
                <div class="topic-pill">
                    <input type="checkbox" id="topic-tech"> 
                    <label for="topic-tech">Technology</label>
                </div>
                <div class="topic-pill">
                    <input type="checkbox" id="topic-academic"> 
                    <label for="topic-academic">Academic</label>
                </div>
                <div class="topic-pill">
                    <input type="checkbox" id="topic-arts"> 
                    <label for="topic-arts">Arts & Entertainment</label>
                </div>
                <div class="topic-pill">
                    <input type="checkbox" id="topic-daily"> 
                    <label for="topic-daily">Daily Life</label>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <div class="character-controls">
                <button id="ai-suggest-button" class="button" style="background-color: rgba(74, 111, 234, 0.1); color: var(--primary-color);">
                    <i class="fas fa-magic" style="margin-right: 5px;"></i> AI Suggestions
                </button>
                <button id="preview-character-button" class="button" style="background-color: rgba(40, 167, 69, 0.1); color: var(--success-color);">
                    <i class="fas fa-eye" style="margin-right: 5px;"></i> Preview
                </button>
            </div>
        </div>
    `;
    
    // Show the modal with the custom content
    showModal('Create Personalized Dialogue Partner', modalContent);
    
    // Add modal-specific class to enable additional styling
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.add('character-creation-modal');
    }
    
    // Set up event handlers after the modal is displayed
    setTimeout(() => {
        // Add click handlers for avatar selection
        const avatarCircles = document.querySelectorAll('.avatar-circle');
        avatarCircles.forEach(circle => {
            circle.addEventListener('click', function() {
                // Remove selection from all avatars
                avatarCircles.forEach(c => {
                    c.classList.remove('selected');
                });
                // Add selection to clicked avatar
                this.classList.add('selected');
            });
        });
        
        // Add click handlers for field pills
        const fieldPills = document.querySelectorAll('.field-pill');
        fieldPills.forEach(pill => {
            pill.addEventListener('click', function() {
                const radioInput = this.querySelector('input[type="radio"]');
                if (radioInput) {
                    radioInput.checked = true;
                    
                    // Update visual state of all pills
                    fieldPills.forEach(p => p.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
            
            // Set initial selected state
            if (pill.querySelector('input[type="radio"]:checked')) {
                pill.classList.add('selected');
            }
        });
        
        // Add click handlers for topic pills
        const topicPills = document.querySelectorAll('.topic-pill');
        topicPills.forEach(pill => {
            pill.addEventListener('click', function() {
                const checkboxInput = this.querySelector('input[type="checkbox"]');
                if (checkboxInput) {
                    checkboxInput.checked = !checkboxInput.checked;
                    
                    // Toggle active style
                    this.classList.toggle('selected', checkboxInput.checked);
                }
            });
        });
        
        // AI Suggestions button
        const aiSuggestButton = document.getElementById('ai-suggest-button');
        if (aiSuggestButton) {
            aiSuggestButton.addEventListener('click', function() {
                // Get selected field
                const selectedField = document.querySelector('input[name="field"]:checked').id.replace('field-', '');
                
                // Simulate AI suggesting traits and topics based on the field
                let suggestedTraits = [];
                let suggestedTopics = [];
                
                switch(selectedField) {
                    case 'business':
                        suggestedTraits = ['professional', 'analytical', 'challenging'];
                        suggestedTopics = ['business', 'tech'];
                        document.getElementById('character-name').value = 'Business Mentor';
                        document.getElementById('character-description').value = 'A professional business mentor with expertise in marketing, management, and entrepreneurship. Specializes in helping you practice business English for meetings, negotiations, and presentations.';
                        break;
                    case 'travel':
                        suggestedTraits = ['friendly', 'encouraging', 'supportive'];
                        suggestedTopics = ['travel', 'daily'];
                        document.getElementById('character-name').value = 'Global Travel Guide';
                        document.getElementById('character-description').value = 'A friendly travel expert who can help you practice conversations for hotels, restaurants, transportation, and tourist attractions. Great for preparing for international trips.';
                        break;
                    case 'academic':
                        suggestedTraits = ['professional', 'analytical', 'challenging'];
                        suggestedTopics = ['academic', 'tech'];
                        document.getElementById('character-name').value = 'Academic Advisor';
                        document.getElementById('character-description').value = 'An academic advisor who can help you practice formal academic English for presentations, discussions, and writing. Provides detailed feedback on your language use.';
                        break;
                    case 'casual':
                        suggestedTraits = ['friendly', 'humorous', 'patient'];
                        suggestedTopics = ['daily', 'arts'];
                        document.getElementById('character-name').value = 'Casual Conversation Partner';
                        document.getElementById('character-description').value = 'A casual conversation partner for everyday situations. Practice informal English, slang, idioms, and natural expressions in a relaxed environment.';
                        break;
                    default:
                        suggestedTraits = ['supportive', 'patient', 'encouraging'];
                        suggestedTopics = ['daily', 'arts'];
                }
                
                // Apply suggestions
                document.querySelectorAll('.trait-item input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = suggestedTraits.includes(checkbox.id.replace('trait-', ''));
                });
                
                document.querySelectorAll('.topic-pill input[type="checkbox"]').forEach(checkbox => {
                    const isSelected = suggestedTopics.includes(checkbox.id.replace('topic-', ''));
                    checkbox.checked = isSelected;
                    checkbox.closest('.topic-pill').classList.toggle('selected', isSelected);
                });
                
                showToast('AI suggestions applied based on selected field');
            });
        }
        
        // Preview button
        const previewButton = document.getElementById('preview-character-button');
        if (previewButton) {
            previewButton.addEventListener('click', function() {
                const characterName = document.getElementById('character-name').value.trim() || 'Custom Partner';
                
                // Show a preview toast
                showToast(`Preview: ${characterName} is ready to chat!`, 2000);
                
                // After a delay, show a simulated chat preview
                setTimeout(() => {
                    const previewHTML = `
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px;">
                                    <img src="${document.querySelector('.avatar-circle.selected img')?.src || ''}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div>
                                    <div style="font-weight: 600;">${characterName}</div>
                                    <div style="font-size: 12px; color: var(--text-secondary);">
                                        ${document.querySelector('input[name="field"]:checked').nextElementSibling.textContent}
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: var(--background-secondary); border-radius: 12px; padding: 12px; margin-left: 50px; position: relative;">
                                <div style="position: absolute; top: -10px; left: -10px; width: 22px; height: 22px; border-radius: 50%; background-color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <i class="fas fa-comment" style="font-size: 12px; color: var(--primary-color);"></i>
                                </div>
                                <p style="margin: 0;">Hello, I'm your new ${characterName}! I'm here to help you practice your English skills. What would you like to talk about today?</p>
                            </div>
                        </div>
                    `;
                    
                    // Create a temporary div to hold the preview
                    const previewContainer = document.createElement('div');
                    previewContainer.style.position = 'fixed';
                    previewContainer.style.bottom = '80px';
                    previewContainer.style.left = '20px';
                    previewContainer.style.right = '20px';
                    previewContainer.style.background = 'white';
                    previewContainer.style.padding = '15px';
                    previewContainer.style.borderRadius = '12px';
                    previewContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    previewContainer.style.zIndex = '2000';
                    previewContainer.style.maxWidth = '400px';
                    previewContainer.style.margin = '0 auto';
                    previewContainer.style.transform = 'translateY(20px)';
                    previewContainer.style.opacity = '0';
                    previewContainer.style.transition = 'all 0.3s ease';
                    previewContainer.innerHTML = previewHTML;
                    
                    // Add close button
                    const closeButton = document.createElement('button');
                    closeButton.style.position = 'absolute';
                    closeButton.style.top = '10px';
                    closeButton.style.right = '10px';
                    closeButton.style.background = 'none';
                    closeButton.style.border = 'none';
                    closeButton.style.color = 'var(--text-secondary)';
                    closeButton.style.fontSize = '16px';
                    closeButton.style.cursor = 'pointer';
                    closeButton.innerHTML = '<i class="fas fa-times"></i>';
                    closeButton.addEventListener('click', () => {
                        previewContainer.style.transform = 'translateY(20px)';
                        previewContainer.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(previewContainer);
                        }, 300);
                    });
                    previewContainer.appendChild(closeButton);
                    
                    // Add to body and animate in
                    document.body.appendChild(previewContainer);
                    setTimeout(() => {
                        previewContainer.style.transform = 'translateY(0)';
                        previewContainer.style.opacity = '1';
                    }, 10);
                    
                    // Auto-remove after 4 seconds
                    setTimeout(() => {
                        previewContainer.style.transform = 'translateY(20px)';
                        previewContainer.style.opacity = '0';
                        setTimeout(() => {
                            if (document.body.contains(previewContainer)) {
                                document.body.removeChild(previewContainer);
                            }
                        }, 300);
                    }, 4000);
                }, 500);
            });
        }
        
        // Customize the save button
        const saveButton = document.querySelector('.modal-save');
        if (saveButton) {
            saveButton.textContent = 'Create Partner';
            
            // Add enhanced save functionality
            saveButton.addEventListener('click', function() {
                const characterName = document.getElementById('character-name').value.trim();
                if (!characterName) {
                    showToast('Please enter a name for your dialogue partner');
                    return;
                }
                
                // Simulate successful creation with toast
                showToast(`Created new dialogue partner: ${characterName}`);
                
                // Add character to the selection (in a real app, this would store to database)
                addCustomCharacterToSelection(characterName);
                
                // Close the modal
                const modalOverlay = document.querySelector('.modal-overlay');
                if (modalOverlay) {
                    modalOverlay.style.opacity = '0';
                    setTimeout(() => {
                        modalOverlay.remove();
                    }, 300);
                }
            });
        }
    }, 100);
}

/**
 * Add a custom character to the character selection
 * @param {string} name - The name of the custom character
 */
function addCustomCharacterToSelection(name) {
    // In a real implementation, this would connect to a backend API
    // For the prototype, we'll simulate adding a new character to the UI
    
    const characterContainer = document.querySelector('div[style*="display: flex; gap: 15px; padding-bottom: 10px;"]');
    if (!characterContainer) return;
    
    // Create a new character element
    const newCharacter = document.createElement('div');
    newCharacter.style.width = '100px';
    newCharacter.style.textAlign = 'center';
    
    // Get selected avatar image
    const selectedAvatar = document.querySelector('.avatar-circle.selected img')?.src || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';
    
    newCharacter.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 8px; position: relative;">
            <img src="${selectedAvatar}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="custom-character-badge">
                <i class="fas fa-star"></i>
            </div>
        </div>
        <div style="font-size: 13px; font-weight: 600;">${name}</div>
        <div style="font-size: 11px; color: var(--text-secondary);">Custom</div>
    `;
    
    // Insert before the create button
    const createButton = document.getElementById('create-character-card');
    if (createButton) {
        characterContainer.insertBefore(newCharacter, createButton);
    } else {
        characterContainer.appendChild(newCharacter);
    }
    
    // Add click listener to the new character
    newCharacter.addEventListener('click', function() {
        // Add selected style
        const allCharacters = characterContainer.querySelectorAll('div[style*="width: 100px; text-align: center;"]');
        allCharacters.forEach(c => {
            const imgElement = c.querySelector('div[style*="width: 80px; height: 80px;"]');
            if (imgElement) {
                imgElement.style.border = 'none';
            }
        });
        
        // Add selected border
        const imgContainer = this.querySelector('div[style*="width: 80px; height: 80px;"]');
        if (imgContainer) {
            imgContainer.style.border = '2px solid var(--primary-color)';
        }
        
        // Show selection notification
        showToast(`Selected: ${name}`);
    });
}

/**
 * Initialize profile page functionality
 */
function initProfile() {
    // Profile page elements
    const statsItems = document.querySelectorAll('.stat-item');
    
    if (!statsItems.length) return; // Exit if not on profile page
    
    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showToast('Edit profile feature would open here');
        });
    }
}

/**
 * Initialize settings page functionality
 */
function initSettings() {
    // Settings toggles
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    
    if (!toggleSwitches.length) return; // Exit if not on settings page
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.querySelector('input');
            input.checked = !input.checked;
            
            const settingName = this.closest('.settings-item')?.querySelector('.settings-label')?.textContent || 'Setting';
            showToast(`${settingName} ${input.checked ? 'enabled' : 'disabled'}`);
        });
    });
    
    // Settings items with navigation
    const navItems = document.querySelectorAll('.settings-item[data-navigate]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navigationTarget = this.getAttribute('data-navigate');
            showToast(`Navigating to: ${navigationTarget}`);
        });
    });
    
    // Sign out button
    const signOutBtn = document.querySelector('.sign-out-btn');
    
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function() {
            showToast('Signing out...');
            
            // In a real implementation, this would sign the user out
            setTimeout(function() {
                showToast('Signed out successfully');
            }, 1000);
        });
    }
    
    // Back button
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            // In a real app, this would navigate back
            showToast('Navigating back');
        });
    }
}

/**
 * Initialize tab navigation
 */
function initTabNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // In a real app, this would navigate to the corresponding page
            const tabName = this.querySelector('.tab-label').textContent;
            showToast(`Navigating to: ${tabName}`);
        });
    });
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, duration = 3000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

/**
 * Show a modal dialog
 * @param {string} title - The modal title
 * @param {string} content - HTML content for the modal body
 */
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="button button-secondary modal-cancel">Cancel</button>
                    <button class="button button-primary modal-save">Save</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = modalOverlay.querySelector('.modal-close');
    const cancelBtn = modalOverlay.querySelector('.modal-cancel');
    const saveBtn = modalOverlay.querySelector('.modal-save');
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
    });
    
    // Close modal when cancel button is clicked
    cancelBtn.addEventListener('click', () => {
        closeModal(modalOverlay);
    });
    
    // Save button action
    saveBtn.addEventListener('click', () => {
        showToast('Changes saved');
        closeModal(modalOverlay);
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Function to close modal with animation
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}
