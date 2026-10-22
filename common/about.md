---
layout: page
title: About Me
description: >-
  Product manager of B2B products, with a triple profile in engineering,
  stakeholder management, and business development — cloud platforms,
  Kubernetes, DevOps, DevSecOps and APIs.
navigation: true
logo: 'assets/images/logo_discrete.png'
cover: 'assets/images/cover1.jpg'
cover_credit: 'Photo by Peter Ivey-Hansen on Unsplash'
current: about
permalink: about.html
---

Hi ! 

I am a product manager with a track record in engineering, management, and business.
Build like an engineer, align like a manager, and sell like an SDR, I thrive in complex B2B enviroment that requires heavy cross-functional collaborations.

I started my career in semi-conductor, building tools to support semiconductor manufacturing in critical situations.

I pursued my career as a DevOps engineer and then a network engineer, scouting bottlenecks and security vulnerabilities in an IT network management platform (SD-WAN, virtual network, SDN/NFV). I built automation pipelines that integrate DevSecOps and cloud-native environments (Docker, Kubernetes, CI/CD) to double the testing capacity.

Next, as a first product manager, I built a cloud-native platform for telecommunications with the R&D team. I owned the product lifecycle from discovery to post-launch KPIs. That was the moment I learned product management by getting my hands dirty, learning from an external community of experts, and constantly asking peer-to-peer feedback.

In 2024, I joined Paris 2024 to spearhead an operations team and deliver telecommunications infrastructure that connect the 2024 Summer Olympics to the whole world – 5 billion of audience. (Hints on the competition venues I worked on: 🧗‍♂️, 🚵, 🏃).

Currently, I work as first business development manager, owning ops and business of fraud prevention family APIs for enterprise customers.

<footer class="post-footer">
{% for author in site.data.authors %}
    {% capture author_path %}author/{{ author[1].username }}{% endcapture %}
    {% if author[1].assets %}
        <figure class="author-image">
            <a class="img" href="{{ author_path | relative_url }}" style="background-image: url({{ author[1].assets | relative_url }})"><span class="hidden">{{ author[1].name }}'s Picture</span></a>
        </figure>
    {% endif %}

    <section class="author">
        <h4><a href="{{ author_path | relative_url }}">{{ author[1].name }}</a></h4>
        {% if author[1].bio %}
            <p>{{ author[1].bio }}</p>
        {% endif %}
        <div class="author-meta">
            {% if author[1].location %}<span class="author-location icon-location"> {{ author[1].location }}</span>{% endif %}
            {% if author[1].url %}<span class="author-link icon-link"><a href="{{ author[1].url_full }}"> {{ author[1].url }}</a></span>{% endif %}
        </div>
    </section>
{% endfor %}
</footer>

