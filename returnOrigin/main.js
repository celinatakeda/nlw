window.addEventListener('scroll', onScroll);

onScroll()
function onScroll() {
    showNavOnScroll()
    showBackToTopButtonOnScroll()

    activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services) 
    activateMenuAtCurrentSection(about) 
    activateMenuAtCurrentSection(contact)      
}

function activateMenuAtCurrentSection(section) {
    // linha alvo
    const targetLine = scrollY + innerHeight / 2;    

    // verificar se a seção passou da linha
    // quais dados vou precisar?

    // o topo da seção
    const sectionTop = section.offsetTop;

    // a altura da seção
    const sectionHeight = section.offsetHeight;

    // o topo da seção chegou ou ultrapassou a linha alvo
    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

    // informações dos dados e da lógica
    console.log('O topo da seção chegou ou passou da linha?', sectionTopReachOrPassedTargetline)

    // verificar se a base está abaixo da linha alvo
    // quais dados vou precisar?

    // a seção termina onde?
    const sectionEndsAt = sectionTop + sectionHeight

    // o final da seção passou da linha alvo
    const sectionEndPassedTargetline = sectionEndsAt <= targetLine

    console.log('O fundo da seção passou da linha?', sectionEndPassedTargetline)

    // limites da seção
    const sectionBoundaries = sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

    const sectionId = section.getAttribute('id')
    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

    menuElement.classList.remove('active')
    if (sectionBoundaries) {
        console.log('estou na seção HOME')
        menuElement.classList.add('active')
    }
}

function showNavOnScroll() { 
    console.log(scrollY)

    const navigationElement = document.querySelector(`#navigation`)
    //console.log(navigationElement)
    if (scrollY > 0) {        
        navigationElement.classList.add('scroll')
    } else {
        navigationElement.classList.remove('scroll')
    }
}

function showBackToTopButtonOnScroll() {
    const backToTopButtonElement = document.querySelector(`#backToTopButton`)
    if (scrollY > 550) {
        backToTopButtonElement.classList.add('show')
    } else {
        backToTopButtonElement.classList.remove('show')
    }
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
}).reveal(`
    #home, 
    #home img, 
    #home .stats, 
    #services,
    #services header,
    #services .card,
    #about,
    #about header,
    #about .content`);