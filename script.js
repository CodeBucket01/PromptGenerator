// script.js - LuminaPrompt functionality

document.addEventListener('DOMContentLoaded', () => {
    // ----- Navigation -----
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-section');
        });
    });

    // ----- Photo Analyzer -----
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadContent = document.getElementById('upload-content');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analyzerResult = document.getElementById('analyzer-result');
    const analyzerOutput = document.getElementById('analyzer-output');
    const analysisOptions = document.getElementById('analysis-options');

    // Drag & Drop handlers
    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = ev => {
                imagePreview.src = ev.target.result;
                imagePreview.classList.remove('hidden');
                removeBtn.classList.remove('hidden');
                uploadContent.classList.add('hidden');
                analyzeBtn.disabled = false;
                analyzerResult.classList.add('hidden');
                analysisOptions.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    }

    removeBtn.addEventListener('click', e => {
        e.stopPropagation();
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        removeBtn.classList.add('hidden');
        uploadContent.classList.remove('hidden');
        fileInput.value = '';
        analyzeBtn.disabled = true;
        analyzerResult.classList.add('hidden');
        analysisOptions.classList.add('hidden');
        const uploadError = document.getElementById('upload-error');
        uploadError.classList.add('hidden');
    });

    // Mock analysis click handler
    analyzeBtn.addEventListener('click', () => {
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...';
        analyzeBtn.disabled = true;
        setTimeout(() => {
            const prompt = generateMockAnalysisPrompt();
            analyzerOutput.value = prompt;
            analyzerResult.classList.remove('hidden');
            analyzeBtn.innerHTML = originalHTML;
            analyzeBtn.disabled = false;
        }, 1500);
    });

    // ----- Random Prompt Generator -----
    const generateRandomBtn = document.getElementById('generate-random-btn');
    const generatorOutput = document.getElementById('generator-output');

    const data = {
        subject: {
            portrait: [
                'Portrait of a young woman with blue eyes',
                'Portrait of an elderly man with wisdom lines',
                'Close-up of a child smiling',
                'Profile shot of a model with striking features',
                'Headshot of a business professional',
                'Portrait of a redhead woman with freckles'
            ],
            'full-body': [
                'Full body shot of a dancer in motion',
                'Walking down a busy street',
                'Sitting on a park bench reading',
                'Standing confidently in a garden',
                'Jumping in the air with joy',
                'Leaning against a brick wall'
            ],
            candid: [
                'Laughing uncontrollably with friends',
                'Sipping coffee in a cozy cafe',
                'Looking at a smartphone intently',
                'Waiting for a train in the rain',
                'Caught in a moment of reflection',
                'Eating street food'
            ],
            studio: [
                'High fashion avant-garde pose',
                'Classic studio headshot on grey background',
                'Artistic silhouette against bright light',
                'Beauty editorial shot with jewelry',
                'Double exposure portrait',
                'Floating pose in zero gravity concept'
            ]
        },
        lighting: {
            golden: ['golden hour lighting', 'warm sunset glow', 'sun flare through hair', 'soft morning mist light', 'magic hour illumination'],
            studio: ['rembrandt lighting', 'butterfly lighting', 'softbox illumination', 'ring light reflection in eyes', 'split lighting', 'high key lighting'],
            neon: ['neon blue and pink cyberpunk lights', 'city night glow', 'street lamp illumination', 'colorful gel lighting', 'fluorescent store lights'],
            natural: ['soft north window light', 'overcast soft light', 'dappled sunlight through leaves', 'harsh midday sun with hard shadows', 'moonlight'],
            dramatic: ['chiaroscuro', 'strong rim lighting', 'dramatic shadows', 'moody low key lighting', 'volumetric god rays', 'silhouette against light']
        },
        style: {
            photorealistic: ['highly detailed', '8k resolution', 'raw photo', 'hyperrealistic', 'unreal engine 5 render', 'ray tracing'],
            cinematic: ['cinematic color grading', 'movie scene aesthetic', 'anamorphic lens flare', 'wide aspect ratio', 'teal and orange look', 'film still'],
            analog: ['vintage film grain', 'Polaroid style', 'Kodak Portra 400', 'light leaks', 'Fujifilm simulation', 'Ilford HP5 Plus'],
            editorial: ['vogue magazine style', 'high-end fashion photography', 'clean background', 'sharp focus', 'commercial look'],
            fantasy: ['ethereal glow', 'dreamy atmosphere', 'magical aura', 'surreal composition', 'digital art style', 'fantasy concept art'],
            minimalist: ['minimalist composition', 'negative space', 'clean lines', 'pastel color palette', 'simple background'],
            vintage: ['1920s style', '1950s kodachrome', 'sepia tone', 'victorian era photography', 'daguerreotype style']
        },
        camera: {
            dslr: ['shot on Canon EOS R5', 'Nikon D850', 'Sony A7R IV', 'sharp focus', 'high shutter speed'],
            film: ['shot on 35mm film', 'medium format Hasselblad', 'Leica M6', 'film grain', 'analog texture'],
            wide: ['16mm wide angle lens', 'fisheye lens', 'GoPro footage style', 'expansive view', 'distortion'],
            telephoto: ['85mm portrait lens', '200mm zoom', 'compressed background', 'shallow depth of field', 'bokeh'],
            drone: ['DJI Mavic shot', 'top-down aerial view', "bird's eye view", 'high altitude', 'wide landscape']
        },
        color: {
            warm: ['warm color palette', 'orange and yellow tones', 'summer vibes', 'cozy atmosphere', 'sepia undertones'],
            cool: ['cool color palette', 'blue and cyan tones', 'winter atmosphere', 'clinical look', 'cold temperature'],
            bw: ['black and white photography', 'monochrome', 'high contrast B&W', 'noir style', 'grayscale'],
            vibrant: ['vibrant colors', 'highly saturated', 'pop art colors', 'vivid tones', 'colorful'],
            muted: ['muted tones', 'desaturated colors', 'matte finish', 'faded look', 'low contrast'],
            pastel: ['pastel color palette', 'soft pinks and blues', 'candy colors', 'dreamy colors', 'light and airy']
        }
    };

    generateRandomBtn.addEventListener('click', () => {
        const subject = document.getElementById('opt-subject').value;
        const lighting = document.getElementById('opt-lighting').value;
        const style = document.getElementById('opt-style').value;
        const camera = document.getElementById('opt-camera').value;
        const color = document.getElementById('opt-color').value;
        const prompt = constructPrompt(subject, lighting, style, camera, color);
        generatorOutput.value = prompt;
    });

    function constructPrompt(sType, lType, styType, cType, colType) {
        const getVal = (type, category) => {
            if (type === 'random') {
                const keys = Object.keys(data[category]);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                const arr = data[category][randomKey];
                return arr[Math.floor(Math.random() * arr.length)];
            }
            const arr = data[category][type];
            return arr[Math.floor(Math.random() * arr.length)];
        };
        const s = getVal(sType, 'subject');
        const l = getVal(lType, 'lighting');
        const st = getVal(styType, 'style');
        const c = getVal(cType, 'camera');
        const col = getVal(colType, 'color');
        const modifiers = ['masterpiece', 'best quality', 'ultra detailed', 'professional', 'award winning'];
        const randomMod = modifiers.sort(() => 0.5 - Math.random()).slice(0, 2).join(', ');
        return `${s}, ${l}, ${st}, ${c}, ${col}, ${randomMod}.`;
    }

    // ----- Utility: Copy Buttons -----
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const text = document.getElementById(targetId).value;
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
                    setTimeout(() => btn.innerHTML = original, 2000);
                });
            }
        });
    });

    // ----- Mock Analysis Prompt Generator -----
    function generateMockAnalysisPrompt() {
        const description = document.getElementById('image-description').value.trim();
        const env = document.getElementById('ana-env').value;
        const mood = document.getElementById('ana-mood').value;

        const styles = ['photorealistic', 'cinematic', 'analog', 'fantasy'];
        const lighting = ['golden hour', 'dramatic', 'natural', 'neon'];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const randomLighting = lighting[Math.floor(Math.random() * lighting.length)];

        let prompt = "";

        if (description) {
            prompt = `${description}, ${randomStyle} style, ${randomLighting} lighting`;
        } else {
            const subjects = ['a person', 'a landscape', 'an object', 'an animal'];
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            prompt = `A ${randomStyle} photo of ${randomSubject} with ${randomLighting} lighting`;
        }

        if (env !== 'auto') {
            prompt += `, environment: ${env}`;
        }
        if (mood !== 'auto') {
            prompt += `, mood: ${mood}`;
        }

        prompt += ', highly detailed, 8k, masterpiece.';
        return prompt;
    }
});
